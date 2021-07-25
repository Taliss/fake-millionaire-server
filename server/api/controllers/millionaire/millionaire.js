import MillionaireService from '../../services/millionaire';
import moment from 'moment';

export class MillionaireController {
  getBuySellPoints(req, res, next) {
    const { start, end } = req.query;
    const startTimeStamp = moment(start).unix();
    const endTimeStamp = moment(end).unix();

    MillionaireService.findBuySellPoints(startTimeStamp, endTimeStamp)
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch(next);
  }
}
export default new MillionaireController();
