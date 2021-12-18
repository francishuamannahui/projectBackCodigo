import PedidosDao from "../dao/pedidosDAO.js";
export default class ReviewController {
    static async apiPostPedidos(req, res, next) {
        try{
            const user = {
                detallePedido:req.body.detallePedido,
                estado:req.body.estado,
                direccion:req.body.direccion,
                coordenadas:req.body.coordenadas,
                idCliente:req.body.idCliente
            }
            console.log(user.detallePedido);
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
             detallePedido : req.body.detallePedido,
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
            console.log(reviewId)
            const reviewResponse = await PedidosDao.deletePedido(
                reviewId,
                userId
            )
            res.json({status : "success"})
        }
        catch(e){
            res.status(500).json({error: e.message})
        }
    }
}