import millionaireRouter from './api/controllers/millionaire/router';

export default function routes(app) {
  app.use('/api/millionaire', millionaireRouter);
}
