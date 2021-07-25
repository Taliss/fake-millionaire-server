import MillionaireService from '../../services/millionaire';
import moment from 'moment';

export class MillionaireController {
  getBuySellPoints(req, res, next) {
    const { start, end } = req.query;
    const startTimeStamp = moment(start).unix();
    const endTimeStamp = moment(end).unix();

    console.time('find');
    MillionaireService.findBuySellPoints(startTimeStamp, endTimeStamp)
      .then((result) => {
        console.log(result);
        console.timeEnd('find');
        res.json({
          buyPoint: result.buyPoint,
          sellPoint: result.sellPoint,
        });
      })
      .catch(next);
  }
}
export default new MillionaireController();
