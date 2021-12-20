import mongodb from "mongodb";
import bcrypt from "bcrypt";
const ObjectId = mongodb.ObjectId;
let clientes;

export default class ClienteDao {
  static async injectDB(conn) {
    if (clientes) {
      return;
    }
    try {
        clientes = await conn.db(process.env.RESTREVIEWS_NS).collection("CLIENTES");
    } catch (e) {
      console.error(`No se pueden establecer identificadores de colección en clienteDao:${e}`);
    }
  }

  static async addCliente(user,date) {
    try {
      const saltos = await bcrypt.genSalt(10)
      const password = await bcrypt.hash(user.password,saltos)
      const clienteDoc = {
          nombre:user.nombre,
          apellido:user.apellido,
          email:user.email,
          telefono:user.telefono,
          direccion:user.direccion,
          coordenadas:user.coordenadas,
          password:password,
          foto:user.foto
      };
      const emailExiste = await clientes.findOne({email:user.email});
      if(emailExiste)throw "Existe el Email"
      else 
      {
        return await clientes.insertOne(clienteDoc)}
    
  } catch (e) {
      console.error(`No se puede agregar el cliente12:${e}`);
      return { error: e };
    }
  }

  static async getCliente(user) {
    try {
      const cliente = {
        apellido:"",
        email:"",
        foto:"",
        nombre:"",
        telefono:"",
        id: "",
        cart:{}
    };
      let emailExiste = await clientes.findOne({email:user});
   

      if(emailExiste){
        cliente.apellido=emailExiste.apellido;
        cliente.email=emailExiste.email;
        cliente.foto=emailExiste.foto;
        cliente.nombre=emailExiste.nombre;
        cliente.telefono=emailExiste.telefono;
        cliente.cart = emailExiste.cart;
        cliente.id=ObjectId(emailExiste._id);
        return cliente;
      }
      else 
      {
        return cliente;
      }
    
  } catch (e) {
      console.error(`No se puede agregar el cliente12:${e}`);
      return { error: e };
    }
  }

}