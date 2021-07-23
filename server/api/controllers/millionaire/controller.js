import ExamplesService from '../../services/examples.service';

export class Controller {
  all(req, res) {
    ExamplesService.all().then((r) => res.json(r));
  }
}
export default new Controller();
