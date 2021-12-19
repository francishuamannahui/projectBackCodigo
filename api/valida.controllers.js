import jwt from 'jsonwebtoken'
export default class verifyToken{
    
    static async validar(req, res, next) {
const token = req.header('auth-token');

        if(!token) return res.status(401).json({error:'Acceso denegado'})
        try {
            const verificar = jwt.verify(token,process.env.TOKEN_SECRET)
            req.user = verificar
            next()
        }
        catch(err) {
         res.status(400).json({error:'Token no es valido'})
        }
    }
}