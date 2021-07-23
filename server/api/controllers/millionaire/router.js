import * as express from 'express';
import controller from './millionaire';
import dateSliceValidation from '../../middlewares/date-slice-validation';

export default express
  .Router()
  .get('/', dateSliceValidation, controller.getBuySellPoints);
