import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let medicamentos;

export default class AlmacenDao {
  static async injectDB(conn) {
    if (medicamentos) {
      return;
    }
    try {
        medicamentos = await conn.db(process.env.RESTREVIEWS_NS).collection("ALMACEN");
    } catch (e) {
      console.error(`No se pueden establecer identificadores de colección en almacenDao:${e}`);
    }
  }
  static async getAlmacenes({
    filters = null,
    page = 0,
    AlmacenesPerPage = 100,
  } = {}) {
    let query;
    if (filters) {
      if ("itemName" in filters) {
        query = { $text: { $search: filters["itemName"] } };
      } else if ("itemClab" in filters) {
        query = { itemClab: { $eq: filters["itemClab"] } };
      }
    }

    let cursor;

    try {
      cursor = await medicamentos.find(query);
    } catch (e) {
      console.error(`No se pudo emitir el comando de búsqueda,${e}`);
      return { almacenesList: [], totalNumAlmacenes: 0 };
    }
    const displayCursor = cursor
      .limit(AlmacenesPerPage)
      .skip(AlmacenesPerPage * page);
    try {
      const almacenesList = await displayCursor.toArray();
      const totalNumAlmacenes = await medicamentos.countDocuments(query);
      return { almacenesList, totalNumAlmacenes };
    } catch (e) {
      console.error(
        `No se puede convertir el cursor en una matriz o
         problemas de recuento de documentos,${e}`
      );
      return { almacenesList: [], totalNumAlmacenes: 0 };
    }
  }
  static async addMedicamento(medicamentoId,medicamentoInfo,medicamentoDetalle,date) {
    try {
      const medicamentosDoc = {
        itemCantidad:medicamentoDetalle.cantidad,
        itemClab:medicamentoInfo.codigolab,
        itemConcentracion:medicamentoInfo.concentracion,
        itemCondicion:medicamentoInfo.condicion,
        itemFechaCreacion:date,
        itemForma:medicamentoInfo.forma,
        itemFoto:medicamentoDetalle.foto,
        itemName:medicamentoInfo.nombre,
        itemPrecioAlmacen: medicamentoDetalle.precioAlmacen,
        itemPrecioVenta:medicamentoDetalle.precioVenta,
        itemUnidad:medicamentoInfo.unidad,
        itemID:medicamentoInfo.itemID,
        itemMedcorpus: ObjectId(medicamentoId)
      };
      return await medicamentos.insertOne(medicamentosDoc);
    } catch (e) {
      console.error(`No se puede modificar el medicamento:${e}`);
      return { error: e };
    }
  }


}