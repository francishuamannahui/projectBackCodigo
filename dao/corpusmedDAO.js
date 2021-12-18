import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let corpusmed;

export default class CorpusmedDAO {
  static async injectDB(conn) {
    if (corpusmed) {
      return;
    }
    try {
      corpusmed = await conn
        .db(process.env.RESTREVIEWS_NS)
        .collection("CORPUS_MED");
    } catch (e) {
      console.error(`No se pudo establecer una colección para ${e}`);
    }
  }
  static async getCorpusmed({
    filters = null,
    page = 0,
    corpusmedPerPage = 100,
  } = {}) {
    let query;
    if (filters) {
      if ("itemName" in filters) {
        query = { $text: { $search: filters["itemName"] } };
      } else if ("itemForma" in filters) {
        query = { itemForma: { $eq: filters["itemForma"] } };
      } else if ("itemTitular" in filters) {
        query = { itemTitular: { $eq: filters["itemTitular"] } };
      }
    }

    let cursor;

    try {
      cursor = await corpusmed.find(query);
    } catch (e) {
      console.error(`No se pudo emitir el comando de búsqueda,${e}`);
      return { corpusmedList: [], totalNumCorpus: 0 };
    }
    const displayCursor = cursor
      .limit(corpusmedPerPage)
      .skip(corpusmedPerPage * page);
    try {
      const corpusmedList = await displayCursor.toArray();
      const totalNumCorpusMed = await corpusmed.countDocuments(query);
      return { corpusmedList, totalNumCorpusMed };
    } catch (e) {
      console.error(
        `No se puede convertir el cursor en una matriz o
         problemas de recuento de documentos,${e}`
      );
      return { corpusmedList: [], totalNumCorpusMed: 0 };
    }
  }
  
  static async getCorpusmedByID(id) {
    try {
      const pipeline = [
        {
          $match: {
            itemID: id,
          },
        }
      ];
      return await corpusmed.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Algo salio mal apiCorpusmedByID: ${e}`);
      throw e;
    }
  }
}
