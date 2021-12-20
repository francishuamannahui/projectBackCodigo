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
                password:req.body.password,
                foto:req.body.foto
            }
            console.log("inicio",cliente.password);
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
    static async apiGetCliente(req, res, next) {
        try{
            const email = req.query.email;
            console.log(email);
            const ReviewResponse = await ClienteDao.getCliente(email)
            
            console.log(ReviewResponse);

            res.json({response:ReviewResponse,status:"success"})
            
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }
}
/*{
    "apellido": "Huamannahui Zavala",
    "email": "lunojod@gmail.com",
    "foto": "https://firebasestorage.googleapis.com/v0/b/constancias-unsaac.appspot.com/o/login%2Fusers_2f16affe-5f3b-45f6-b611-76767d2f6020.jpeg?alt=media&token=021e3cfc-1551-41c0-9154-b8ae8eb84853",
    "nombre": "Juan Perez",
    "telefono": "984001116",
    "id": "61be5d9188ea4faaed89978d"
} */