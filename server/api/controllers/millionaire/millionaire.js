import MillionaireService from '../../services/millionaire';
import moment from 'moment';

export class MillionaireController {
  getBuySellPoints(req, res) {
    const { start, end } = req.query;
    const startTimeStamp = moment(start).unix();
    const endTimeStamp = moment(end).unix();
    MillionaireService.findEarliestPoints([
      { timestamp: 1611266400, price: 7 },
      { timestamp: 1611266401, price: 7 },
      { timestamp: 1611266402, price: 8 },
      { timestamp: 1611266403, price: 1 },
      { timestamp: 1611266404, price: 1 },
      { timestamp: 1611266405, price: 7 },
      { timestamp: 1611266406, price: 7 },
      // { timestamp: 1611266408, price: 429.19 },
      // { timestamp: 1611266409, price: 355.02 },
    ]).then((result) => {
      console.log(result);
      res.json(result);
    });
    // MillionaireService.testingHighland(startTimeStamp, endTimeStamp).then((r) =>
    //   res.json(r)
    // );
  }
}
export default new MillionaireController();
