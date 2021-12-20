import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let pedidos;

export default class PedidoDao {
  static async injectDB(conn) {
    if (pedidos) {
      return;
    }
    try {
        pedidos = await conn.db(process.env.RESTREVIEWS_NS).collection("PEDIDOS");
    } catch (e) {
      console.error(`No se pueden establecer identificadores de colección en pedidosDao:${e}`);
    }
  }

  static async addPedido(user,date) {
    try {
      const pedidoDoc = {
          cart:user.cart,
          total:user.totalPedido,
          estado:user.estado,
          fechaPedido:date,
          direccion:user.direccion,
          coordenadas:user.coordenadas,
          idCliente: ObjectId(user.idCliente)
      };
      return await pedidos.insertOne(pedidoDoc);
    } catch (e) {
      console.error(`No se puede pedir su pedido:${e}`);
      return { error: e };
    }
  }
  static async updatePedido(reviewId, userId, user, date) {
    try {
      const updateResponse = await pedidos.updateOne(
        { idCliente:ObjectId(userId), _id: ObjectId(reviewId) },
        { $set: { direccion:user.direccion ,cart: user.cart, 
          estado:user.estado,direccion:user.direccion,
          coordenadas:user.coordenadas,fechaPedido: date } }
      );
      return updateResponse;
    } catch (e) {
      console.error(`No se puede actualizar su pedido: ${e}`);
      return { error: e };
    }
  }
  
  static async deletePedido(reviewId, userId) {
    try {
      const deleteResponse = await pedidos.deleteOne({
        _id: ObjectId(reviewId)
      });
      return deleteResponse;
    } catch (e) {
      console.error(`No se puede borrar su pedido:${e}`);
      return { error: e };
    }
  }
  static async getPedidos({
    filters = null,
    page = 0,
    PedidosPerPage = 50,
  } = {}) {
    let query;
    if (filters) {


      if ("idCliente" in filters) {
        query = { "idCliente": ObjectId(filters["itemName"] )};
      } 
    }

    let cursor;
    
    try {
      cursor =   await pedidos.find(query);
    } catch (e) {
      console.error(`No se pudo emitir el comando de búsqueda,${e}`);
      return { pedidosList: [], totalNumPedidos: 0 };
    }

    console.log(cursor);

    const displayCursor = cursor
      .limit(PedidosPerPage)
      .skip(PedidosPerPage * page);
    try {
      const pedidosList = await displayCursor.toArray();
      const totalNumPedidos = await pedidos.countDocuments(query);
      return { pedidosList, totalNumPedidos };
    } catch (e) {
      console.error(
        `No se puede convertir el cursor en una matriz o
         problemas de recuento de documentos,${e}`
      );
      return { pedidosList: [], totalNumPedidos: 0 };
    }
  }
  
  



}