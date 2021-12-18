import CorpusmedDAO from "../dao/corpusmedDAO.js";
export default class CorpusmedController {
  static async apiGetCorpusMed(req, res, next) {
    const corpusmedPerPage = req.query.corpusmedPerPage
      ? parseInt(req.query.corpusmedPerPage, 10)
      : 10000;

    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.itemForma) {
      filters.itemForma = req.query.itemForma;
    } else if (req.query.itemTitular) {
      filters.itemTitular = req.query.itemTitular;
    } else if (req.query.itemName) {
      filters.itemName = req.query.itemName;
    }

    const { corpusmedList, totalNumCorpusMed } =
      await CorpusmedDAO.getCorpusmed({
        filters,
        page,
        corpusmedPerPage,
      });
    let response = {
      corpusMed: corpusmedList,
      page: page,
      filters: filters,
      entries_per_page: corpusmedPerPage,
      total_results: totalNumCorpusMed,
    };
    res.json(response);
  }


  static async apiCorpusmedByID(req, res, next) {
     try{
       let id = req.params.id || {};
       console.log(id);
       let corpusmed = await CorpusmedDAO.getCorpusmedByID(id);
       if(!corpusmed) {
         res.status(404).json({ error:"Not Found"})
         return;
       }
       res.json(corpusmed);
     }
     catch(e){
      console.log();
      res.status(500).json({ error:e});
     }
  }
 
}
