import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let usuarios;

export default class UsuarioDao {
  static async injectDB(conn) {
    if (usuarios) {
      return;
    }
    try {
        usuarios = await conn.db(process.env.RESTREVIEWS_NS).collection("USUARIOS");
    } catch (e) {
      console.error(`No se pueden establecer identificadores de colección en userDao:${e}`);
    }
  }

  static async addUsuario(user,date) {
    try {
      const usuariosDoc = {
          nombre:user.nombre,
          apellido:user.apellido,
          email:user.email,
          password:user.password
      };
      return await usuarios.insertOne(usuariosDoc);
    } catch (e) {
      console.error(`No se puede agregar su usuario:${e}`);
      return { error: e };
    }
  }


}