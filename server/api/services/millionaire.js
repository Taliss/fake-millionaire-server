import l from '../../common/logger';

class MillionaireService {
  FindEarliestPoints(slice = []) {
    const length = slice.length;
    // validate that we have atleast 2 points in time
    console.log(length);
    if (length < 2) {
      // TODO dummy resolve
      return Promise.resolve({
        buyPoint: { dateTime: '2021-07-22T08:54:58Z', price: 5 },
        sellPoint: { dateTime: '2021-07-22T10:54:58Z', price: 10 },
      });
    }

    const iterationInfo = {
      maxDiff: 0,
      highestPrice: slice[length - 1].price,
      buyPointIndex: null,
      sellPointIndex: null,
      pendingSellPointIndex: length - 1,
    };

    for (let i = length - 2; i >= 0; i--) {
      const point = slice[i];

      if (point.price >= iterationInfo.highestPrice) {
        iterationInfo.highestPrice = point.price;
        iterationInfo.pendingSellPointIndex = i;
      } else {
        const difference = Number(
          (iterationInfo.highestPrice - point.price).toFixed(2)
        );
        if (difference >= iterationInfo.maxDiff) {
          iterationInfo.maxDiff = difference;
          iterationInfo.buyPointIndex = i;
          iterationInfo.sellPointIndex = iterationInfo.pendingSellPointIndex;
        }
      }
    }

    // real
    // return {
    //   buyPoint: { ...slice[iterationInfo.buyPointIndex] },
    //   sellPoint: { ...slice[iterationInfo.sellPointIndex] },
    // };

    // TODO dummy resolve
    return {
      buyPoint: { dateTime: '2021-07-22T08:54:58Z', price: 5 },
      sellPoint: { dateTime: '2021-07-22T10:54:58Z', price: 10 },
    };
  }
}

export default new MillionaireService();
