import LaboratoriosDAO from "../dao/laboratoriosDAO.js";
export default class LaboratoriosController {
  static async apiGetLaboratorios(req, res, next) {
    const laboratoriosPerPage = req.query.laboratoriosPerPage
      ? parseInt(req.query.laboratoriosPerPage, 10)
      : 529;

    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.itemEmpresa) {
      filters.itemEmpresa = req.query.itemEmpresa;
    } 
    const { laboratoriosList, totalNumLaboratorios } =
      await LaboratoriosDAO.getLaboratorios({
        filters,
        page,
        laboratoriosPerPage,
      });
    let response = {
      laboratorios: laboratoriosList,
      page: page,
      filters: filters,
      entries_per_page: laboratoriosPerPage,
      total_results: totalNumLaboratorios,
    };
    res.json(response);
  }


  static async apiLaboratoriosByID(req, res, next) {
     try{
       let id = req.params.id || {};
       let laboratorios = await LaboratoriosDAO.getLaboratoriosByID(id);
       if(!laboratorios) {
         res.status(404).json({ error:"Not Found"})
         return;
       }
       res.json(laboratorios);
     }
     catch(e){
      console.log();
      res.status(500).json({ error:e});
     }
  }
 
}
