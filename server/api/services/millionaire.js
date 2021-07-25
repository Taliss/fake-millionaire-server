import l from '../../common/logger';
import _ from 'highland';
import * as path from 'path';
import * as fs from 'fs';

class MillionaireService {
  findEarliestPoints = (slice = []) => {
    const length = slice.length;
    // validate that we have atleast 2 points in time
    if (length < 2) {
      // TODO dummy resolve
      return Promise.resolve({
        buyPoint: { dateTime: '2021-07-22T08:54:58Z', price: 5 },
        sellPoint: { dateTime: '2021-07-22T10:54:58Z', price: 10 },
      });
    }

    const iterationInfo = {
      maxDiff: 0,
      lowestPrice: slice[0].price,
      buyPointIndex: null,
      sellPointIndex: null,
      pendingBuyPointIndex: 0,
    };

    for (let i = 1; i < length; i++) {
      const point = slice[i];

      if (point.price < iterationInfo.lowestPrice) {
        iterationInfo.lowestPrice = point.price;
        iterationInfo.pendingBuyPointIndex = i;
      } else {
        const difference = Number(
          (point.price - iterationInfo.lowestPrice).toFixed(2)
        );
        console.log(difference);
        if (difference > iterationInfo.maxDiff) {
          iterationInfo.maxDiff = difference;
          iterationInfo.sellPointIndex = i;
          iterationInfo.buyPointIndex = iterationInfo.pendingBuyPointIndex;
        }
      }
    }

    // real
    return Promise.resolve({
      buyPoint: { ...slice[iterationInfo.buyPointIndex] },
      sellPoint: { ...slice[iterationInfo.sellPointIndex] },
      iterationInfo,
    });

    // TODO dummy resolve
    // return {
    //   buyPoint: { dateTime: '2021-07-22T08:54:58Z', price: 5 },
    //   sellPoint: { dateTime: '2021-07-22T10:54:58Z', price: 10 },
    // };
  };

  testingHighland(startTimeStamp, endTimeStamp) {
    // return Promise.resolve({
    //   buyPoint: { dateTime: '2021-07-22T08:54:58Z', price: 5 },
    //   sellPoint: { dateTime: '2021-07-22T10:54:58Z', price: 10 },
    // });

    const expectedRecords = endTimeStamp - startTimeStamp + 1;

    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(
        path.resolve(__dirname, '../../small.csv')
      );

      readStream.on('error', (err) => {
        reject(err);
      });

      _(readStream)
        .invoke('toString', ['utf8'])
        .split()
        .filter((line) => line)
        .map((line) => line.split(','))
        .filter(([timeStampString]) => {
          const timeStamp = Number(timeStampString);
          console.log(timeStamp);
          return timeStamp >= startTimeStamp && timeStamp <= endTimeStamp;
        })
        .map((line) => {
          return line;
        })
        .each((x) => console.log(x))
        .done(() => {
          console.log('done');
          console.log('Expected: ', expectedRecords);
          resolve({
            buyPoint: { dateTime: '2021-07-22T08:54:58Z', price: 5 },
            sellPoint: { dateTime: '2021-07-22T10:54:58Z', price: 10 },
          });
        });
    });
  }
}

export default new MillionaireService();
