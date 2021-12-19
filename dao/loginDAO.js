import mongodb from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
        `No se pueden establecer identificadores de colección en clienteDAO:${e}`
      );
    }
  }

  static async getLogin(user) {
    try {
      const existe = await login.findOne({ email: user.email });
      let token="";
      if (!existe) throw "No existe usuario";
      else {
        const password = user.password;
        const hash = existe.password;
        const esValido = await compareBcryy(password, hash);
        if(esValido){
           token = jwt.sign(
            {
              nombre: existe.nombre,
              id: existe._id,
            },
            process.env.TOKEN_SECRET
          );
          return token ;
       
        }
        {
          return { error: 'Password Incorrecto' };
        }
        
      }
    } catch (e) {
      console.error(`error login:${e}`);
      return { error: e };
    }
  }
}
const compareBcryy = async (password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.log(error);
  }
  return false;
};
