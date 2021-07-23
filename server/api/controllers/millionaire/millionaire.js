import MillionaireService from '../../services/millionaire';

export class MillionaireController {
  getBuySellPoints(req, res) {
    const { start, end } = req.query;
    MillionaireService.findBytSellPoints({ start, end }).then((r) =>
      res.json(r)
    );
  }
}
export default new MillionaireController();
