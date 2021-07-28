import l from '../../common/logger';
import _ from 'highland';
import * as path from 'path';
import * as fs from 'fs';
import { config } from 'dotenv';
import { getPointsInRange } from './memcache';

class MillionaireService {
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
    return _(getPointsInRange(startTimeStamp, endTimeStamp))
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
