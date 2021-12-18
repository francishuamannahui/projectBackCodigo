import ClienteDao from "../dao/clienteDAO.js"
export default class ReviewController {
    static async apiPostCliente(req, res, next) {
        try{
            const cliente = {
                nombre:req.body.nombre,
                apellido:req.body.apellido,
                email:req.body.email,
                telefono:req.body.telefono,
                direccion:req.body.direccion,
                coordenadas:req.body.coordenadas,
                password:req.body.password
            }
            
            const date = new Date()
            const ReviewResponse = await ClienteDao.addCliente(
                cliente,
                date,
            )
            
            if(ReviewResponse["error"]){
                res.status(500).json({error: 'Existe el email'})
            }else{
                res.json({status:"success"})
            }
            
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }
}