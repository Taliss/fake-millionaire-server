import l from '../../common/logger';

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class ExamplesService {
  all() {
    const fewDateForTest = [
      {
        buyPoint: { dateTime: '2021-07-22T08:54:58.406Z', price: 5 },
        sellPoint: { dateTime: '2021-07-22T10:54:58.406Z', price: 10 },
      },
      {
        buyPoint: { dateTime: '2021-07-21T010:54:58.406Z', price: 2 },
        sellPoint: { dateTime: '2021-07-28T019:54:58.406Z', price: 7 },
      },
      {
        buyPoint: { dateTime: '2021-07-30T011:14:17.406Z', price: 1 },
        sellPoint: { dateTime: '2021-07-30T12:54:03.406Z', price: 8 },
      },
    ];

    return Promise.resolve(fewDateForTest[randomIntFromInterval(0, 2)]);
  }
}

export default new ExamplesService();
