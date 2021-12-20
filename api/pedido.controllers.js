import PedidosDao from "../dao/pedidosDAO.js";
export default class ReviewController {
    static async apiPostPedidos(req, res, next) {
        try{
            const user = {
                cart:req.body.cart,
                estado:req.body.estado,
                direccion:req.body.direccion,
                coordenadas:req.body.coordenadas,
                idCliente:req.body.idCliente
            }
            console.log(user.cart);
            const date = new Date()
            const ReviewResponse = await PedidosDao.addPedido(
                user,
                date,
            )
            res.json({status:"success"})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiUpdatePedido(req, res, next) {
        try{
            const reviewId = req.body.id
            const userId= req.body.idCliente

            const user = {
             direccion : req.body.direccion,
             cart : req.body.cart,
             estado: req.body.estado,
             coordenadas:req.body.coordenadas
            }
            const date = new Date()
            
            const updateResponse = await PedidosDao.updatePedido(
                reviewId,
                userId,
                user,
                date,
            )
            var {error} = updateResponse
            if(error){
                res.status(400).json({error})
            }
            if(updateResponse.modifiedCount === 0){
                throw new Error(
                    "No se puede actualizar la pedido: es posible que el usuario no sea el autor original",
                )
            }
            res.json({status:"success"})
         } catch(e){
             res.status(500).json({error: e.message})
         }
    }
    static async apiDeletePedido(req, res, next){
        try{
            const reviewId = req.body.id
            const userId= req.body.idcliente
            const reviewResponse = await PedidosDao.deletePedido(
                reviewId,
                userId
            )
            console.log(reviewResponse);
            res.json({status : "success"})
        }
        catch(e){
            res.status(500).json({error: e.message})
        }
    }
    static async apiGetPedidos(req, res, next){
        const pedidosPerPage = req.query.pedidosPerPage
      ? parseInt(req.query.pedidosPerPage, 10)
      : 529;

    const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    console.log("jj",req.query.idCliente);
    let filters = {};
    if (req.query.idCliente) {
        console.log(req.query.idCliente);
      filters.idCliente = req.query.idCliente;
    } 
    console.log(filters);
    const { pedidosList, totalNumPedidos } =
      await PedidosDao.getPedidos({
        filters,
        page,
        pedidosPerPage,
      });
    let response = {
      pedidos: pedidosList,
      page: page,
      filters: filters,
      entries_per_page: pedidosPerPage,
      total_results: totalNumPedidos,
    };
    res.json(response);
    }
}