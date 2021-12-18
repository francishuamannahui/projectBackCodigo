import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let laboratorios;

export default class LaboratoriosDAO {
  static async injectDB(conn) {
    if (laboratorios) {
      return;
    }
    try {
        laboratorios = await conn
        .db(process.env.RESTREVIEWS_NS)
        .collection("LABORATORIOS");
    } catch (e) {
      console.error(`No se pudo establecer una colección para ${e}`);
    }
  }
  static async getLaboratorios({
    filters = null,
    page = 0,
    laboratoriosPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ("itemEmpresa" in filters) {
        query = { $text: { $search: filters["itemEmpresa"] } };
      } 
    }

    let cursor;

    try {
      cursor = await laboratorios.find(query);
    } catch (e) {
      console.error(`No se puede emitir el comando de búsqueda,${e}`);
      return { laboratoriosList: [], totalNumLaboratorios: 0 };
    }
    const displayCursor = cursor
      .limit(laboratoriosPerPage)
      .skip(laboratoriosPerPage * page);
    try {
      const laboratoriosList = await displayCursor.toArray();
      const totalNumLaboratorios = await laboratorios.countDocuments(query);
      return { laboratoriosList, totalNumLaboratorios };
    } catch (e) {
      console.error(
        `No se puede convertir el cursor en una matriz o
         problemas de recuento de documentos,${e}`
      );
      return { laboratoriosList: [], totalNumLaboratorios: 0 };
    }
  }
  
  static async getLaboratoriosByID(id) {
    try {
      const pipeline = [
        {
          $match: {
            itemID: id,
          },
        },{
            $lookup: {
                from:"CORPUS_MED",
                let:{
                    id:"$itemID"
                },
                pipeline :[
                    {
                        $match: {
                            $expr: {
                                $eq: ["$itemClab", "$$id"],
                            },
                        },
                    },
                    {
                        $sort: {
                            date: -1,
                        },
                    },
                ],as:"medicamentos"
            }
        },
        {
            $addFields: {
                medicamentos: "$medicamentos",
            },
        },
      ];
      return await laboratorios.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Algo salio mal getLaboratoriosByID: ${e}`);
      throw e;
    }
  }
}
