const mongoose = require('mongoose');
const Users = require('../models/Users');


async function seleccionarIdsByCi(valoresArray) {
    
    try {
            
            if(!Users){
                throw error(console.log('No reconoce Users o no conecta'));
            };
        
            // Buscar documentos cuyos `_id` estén en `valoresArray` en `ModeloB`
            const personalByCi = await Users.find({ Badgenumber: { $in: valoresArray } });// Users.find() --> devuelve un array de documentos.
            //const personalByCi = await Users.findOne({ Badgenumber: { $in: valoresArray } });// Users.find() --> devuelve un único documento que coincide con los criterios especificados
            //const idsPersonal = personalByCi.map(doc => [doc.USERID, doc.Name]);//Para obtener ids y nombres
            const idsPersonal = personalByCi.map(doc => doc.USERID);
            //console.log('lista de personal', personalByCi);
            console.log('IDs obtenidos de Personal:', idsPersonal);

            return idsPersonal;
        } catch (error) {
            console.error('Error al conectar a MongoDB o al seleccionar datos:', error);
        } finally {
            // Cerrar la conexión a la base de datos
            await mongoose.disconnect();
        }

    
}

const ids = [
    5283535, 5155147, 5184349, 8020486, 7906910, 7940575, 12460525
  ];

//seleccionarIdsByCi(ids);

// Exportar la función
module.exports = { seleccionarIdsByCi };

