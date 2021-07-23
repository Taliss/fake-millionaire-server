import { VALID_TIME_SLICE } from '../../common/constants';
import moment from 'moment';

export default function dateSliceValidation(req, res, next) {
  const { start, end } = req.query;
  const startMoment = moment(start);
  const endMoment = moment(end);

  if (endMoment.isSameOrBefore(startMoment)) {
    next({
      message: 'End is before or equal to start date',
      status: 400,
    });
  }

  if (
    startMoment.isBefore(VALID_TIME_SLICE.startMoment) ||
    endMoment.isAfter(VALID_TIME_SLICE.endMoment)
  ) {
    next({
      message: `Date slice is out of range.Supported date time range is: ${VALID_TIME_SLICE.startMoment.format(
        'MMMM Do YYYY, h:mm:ss'
      )} - ${VALID_TIME_SLICE.endMoment.format('MMMM Do YYYY, h:mm:ss')}`,
      status: 400,
    });
  }
  next();
}
