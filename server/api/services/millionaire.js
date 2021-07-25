import l from '../../common/logger';
import _ from 'highland';
import * as path from 'path';
import * as fs from 'fs';

class MillionaireService {
  // TODO: also slow, but approach is same if we had db, we could directly stream only the required time-slice of points
  getCSVstream() {
    return fs.createReadStream(path.resolve(__dirname, '../../all.csv'));
  }

  splitLineData(separator = ',') {
    return (line) => line.split(separator);
  }

  filterEmptyLines(line) {
    return line;
  }

  filterAndSliceStream(startTimeStamp, endTimeStamp) {
    return (err, splitedLine, push, next) => {
      if (err) {
        push(err);
      } else if (splitedLine === _.nil) {
        push(null, splitedLine);
      } else {
        const timeStamp = Number(splitedLine[0]);

        // cut stream at end timestamp
        if (timeStamp > endTimeStamp) {
          push(null, _.nil);
        } else if (timeStamp >= startTimeStamp) {
          push(null, splitedLine);
          next();
        }
      }
    };
  }

  // TODO this is dummy and slow as we do it every time, but no time for db
  filterByDateTimeSlice(startTimeStamp, endTimeStamp) {
    return ([timeStampString]) => {
      const timeStamp = Number(timeStampString);
      return timeStamp >= startTimeStamp && timeStamp <= endTimeStamp;
    };
  }

  parseCSVline([timeStampString, priceString]) {
    return {
      timestamp: Number(timeStampString),
      price: Number(priceString),
    };
  }

  // TODO: The order of the memo and iterator arguments will be flipped in the next major version release of highland
  findEarliestPoints = (iterationInfo = {}, point) => {
    // bake initial info and skip first point piped in
    if (iterationInfo.initialState) {
      iterationInfo.initialState = false;
      iterationInfo.lowestPrice = point.price;
      iterationInfo.pendingBuyPoint = point;
      return iterationInfo;
    }

    if (point.price < iterationInfo.lowestPrice) {
      iterationInfo.lowestPrice = point.price;
      iterationInfo.pendingBuyPoint = point;
    } else {
      const difference = Number(
        (point.price - iterationInfo.lowestPrice).toFixed(2)
      );
      if (difference > iterationInfo.maxDiff) {
        iterationInfo.maxDiff = difference;
        iterationInfo.sellPoint = point;
        iterationInfo.buyPoint = iterationInfo.pendingBuyPoint;
      }
    }

    return iterationInfo;
  };

  findBuySellPoints(startTimeStamp, endTimeStamp) {
    const filterOffsetAndCut = this.filterAndSliceStream(
      startTimeStamp,
      endTimeStamp
    );
    const splitByDefaultSeparator = this.splitLineData();

    return _(this.getCSVstream())
      .invoke('toString', ['utf8'])
      .split()
      .filter(this.filterEmptyLines)
      .map(splitByDefaultSeparator)
      .consume(filterOffsetAndCut)
      .map(this.parseCSVline)
      .reduce(
        {
          maxDiff: 0,
          lowestPrice: 0,
          buyPoint: null,
          sellPoint: null,
          pendingBuyPoint: null,
          initialState: true,
        },
        this.findEarliestPoints
      )
      .toPromise(Promise);
  }
}

export default new MillionaireService();
