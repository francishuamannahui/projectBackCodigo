import AlmacenDao from "../dao/almacenDAO.js";
export default class ReviewController {
    static async apiGetAlmacenes(req, res, next) {
        const almacenesPerPage = req.query.almacenesPerPage
          ? parseInt(req.query.almacenesPerPage, 10)
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
    
        const { almacenesList, totalNumAlmacenes } =
          await AlmacenDao.getAlmacenes({
            filters,
            page,
            almacenesPerPage,
          });
        let response = {
          almacenes: almacenesList,
          page: page,
          filters: filters,
          entries_per_page: almacenesPerPage,
          total_results: totalNumAlmacenes,
        };
        res.json(response);
      }
    static async apiPostAlmacen(req, res, next) {
        try{
            
            const medicamentoId = req.body.codMedcorpus;

            const medicamentoDetalle = {
                cantidad: req.body.itemCantidad,
                foto: req.body.itemFoto,
                precioAlmacen: req.body.itemPrecioAlmacen,
                precioVenta: req.body.itemPrecioVenta,

            }
            const medicamentoInfo = {
                concentracion: req.body.itemConcentracion,
                codigolab: req.body.itemClab,
                condicion: req.body.itemCondicion,
                nombre: req.body.itemName,
                forma:req.body.itemForma,
                unidad : req.body.itemUnidad,
                itemID:req.body.itemID,
            }
            const date = new Date()
            const ReviewResponse = await AlmacenDao.addMedicamento(
                medicamentoId,
                medicamentoInfo,
                medicamentoDetalle,
                date,
            )
            res.json({status:"success"})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }
}