import UsuariosDao from "../dao/usuarioDAO.js";
export default class ReviewController {
    static async apiPostUsuario(req, res, next) {
        try{
            const user = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                password: req.body.password
            }
            
            const date = new Date()
            const ReviewResponse = await UsuariosDao.addUsuario(
                user,
                date,
            )
            res.json({status:"success"})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }
}