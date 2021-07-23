import MillionaireService from '../../services/millionaire';

export class MillionaireController {
  all(req, res) {
    MillionaireService.all().then((r) => res.json(r));
  }
}
export default new MillionaireController();
