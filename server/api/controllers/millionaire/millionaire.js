import MillionaireService from '../../services/millionaire';
import moment from 'moment';

export class MillionaireController {
  getBuySellPoints(req, res) {
    const { start, end } = req.query;
    const startTimeStamp = moment(start).unix();
    const endTimeStamp = moment(end).unix();
    MillionaireService.testingHighland(startTimeStamp, endTimeStamp).then((r) =>
      res.json(r)
    );
  }
}
export default new MillionaireController();
