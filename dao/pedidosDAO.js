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
          cart:user.detallePedido,
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
        { $set: { direccion:user.direccion ,cart: user.detallePedido, 
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
        _id: ObjectId(reviewId),
        idCliente: ObjectId(userId),
      });
      return deleteResponse;
    } catch (e) {
      console.error(`No se puede borrar su pedido:${e}`);
      return { error: e };
    }
  }


}