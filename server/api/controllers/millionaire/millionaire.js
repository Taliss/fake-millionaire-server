import MillionaireService from '../../services/millionaire';
import { DATE_TIME_FORMAT } from '../../../common/constants';
import moment from 'moment';

export class MillionaireController {
  getBuySellPoints(req, res, next) {
    const { start, end } = req.query;
    const startTimeStamp = moment(start).unix();
    const endTimeStamp = moment(end).unix();

    MillionaireService.findBuySellPoints(startTimeStamp, endTimeStamp)
      .then(({ buyPoint, sellPoint }) => {
        res.json({
          buyPoint: {
            dateTime: moment.unix(buyPoint.timestamp).format(DATE_TIME_FORMAT),
            price: buyPoint.price,
          },
          sellPoint: {
            dateTime: moment.unix(sellPoint.timestamp).format(DATE_TIME_FORMAT),
            price: sellPoint.price,
          },
        });
      })
      .catch(next);
  }
}
export default new MillionaireController();
