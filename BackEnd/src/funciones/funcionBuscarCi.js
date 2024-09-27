const mongoose = require('mongoose');
const conAccess = require('node-adodb');

const { Users } = require('../models/Users.js');


let arreglo = [2,3,6,5,8,9];

async function seleccionarDatosPorValores(valoresArray) {
    const connection = conAccess.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=./bd/att2000.mdb;');

    connection.query('SELECT USERID, CHECKTIME FROM CHECKINOUT').then(async data => {
    try {
            
            if(!Users){
                throw error('No reconoce Users o no conecta');
                console.log('No conecta con Users');
            };
        
            // Buscar documentos cuyos `_id` estén en `valoresArray` en `ModeloB`
            const personalByCi = await Users.find({ Badgenumber: { $in: valoresArray } });

            const idsPersonal = personalByCi.map(doc => doc.USERID);
            console.log('IDs obtenidos de Personal:', idsPersonal);

            
                const idsBuscados = new Set(idsPersonal);
                console.log("idsBuscados", typeof idsBuscados);
                console.log("idsperrsonal", typeof idsPersonal);
                const tikeoById = data.filter(registro => idsBuscados.has(registro.USERID));
                if (tikeoById.length === 0){
                    console.log('No se encontraron registros coincidentes');
                }else{
                    //console.log(registroCoincidencias);
                }
            
            const cadena = JSON.stringify(tikeoById, null, 2);

            // Retornar los documentos encontrados
            return cadena;
        } catch (error) {
            console.error('Error al conectar a MongoDB o al seleccionar datos:', error);
        } finally {
            // Cerrar la conexión a la base de datos
            await mongoose.disconnect();
        }

    });
}

// Exportar la función
module.exports = { seleccionarDatosPorValores };

