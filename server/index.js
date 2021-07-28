import './common/env';
import Server from './common/server';
import routes from './routes';
import * as path from 'path';
import { cwd } from 'process';

export default new Server()
  .liftDataFrom(path.join(cwd(), 'server/all.csv'))
  .then((server) => server.router(routes).listen(process.env.PORT))
  .catch((err) => {
    console.error('Loading data and lifting server failed');
    console.error(err);
  });
