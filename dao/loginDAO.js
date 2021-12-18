import mongodb from "mongodb";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
const ObjectId = mongodb.ObjectId;
let login;

export default class LoginDao {
  static async injectDB(conn) {
    if (login) {
      return;
    }
    try {
      login = await conn.db(process.env.RESTREVIEWS_NS).collection("CLIENTES");
    } catch (e) {
      console.error(
        `No se pueden establecer identificadores de colección en almacenDao:${e}`
      );
    }
  }
  static async getLogin(user) {
    try {
      const saltos = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(user.password, saltos);
      const passwordValido=false;
      const existe = await login.findOne({ email: user.email });
      if (!existe) throw "No existe usuario";
      else {
        console.log("bd", existe.password);
        console.log("ingresado", user.password);
        
        bcrypt.compare(user.password, existe.password, 
          function(err, result) {
          if (err) { throw (err); }
          if (result){
            const token = jwt.sign({ 
              nombre: existe.nombre,
              id:existe.id,
            })

          }
          else {
            throw "Password Incorrecto";
          }
      });

       
      }
    } catch (e) {
      console.error(`error:${e}`);
      return { error: e };
    }
  }
}
