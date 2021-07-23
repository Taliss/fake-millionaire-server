import * as express from 'express';
import controller from './millionaire';

export default express.Router().get('/', controller.all);
