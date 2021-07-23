import l from '../../common/logger';

class ExamplesService {
  all() {
    const dt = new Date();
    const month = dt.getMonth() + 1;
    const year = dt.getFullYear();
    const daysInMonth = new Date(year, month, 0).getDate();
    return Promise.resolve({ month, year, daysInMonth });
  }
}

export default new ExamplesService();
