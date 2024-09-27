//set PATH=%PATH%;C:\Python\Python312\


const { exec } = require('child_process');
const path = require('path');

const {mongoose, uri, option} = require('../database/conexionMongo');
const {TikeoMdb} = require('../models/TikeoEnvioMdb')

const mdbFilePath = path.resolve('bd/att2000.mdb');
const tableName = 'CHECKINOUT';
const pythonScript = path.resolve('src/funciones/prueba.py');

// Envolver las rutas en comillas dobles

const obtenerTikeosAccess = async() => {
    exec(`python "${pythonScript}" "${mdbFilePath}" ${tableName}`,{ maxBuffer: 1024 * 100000 }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error ejecutando el script: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        try {
            // Convertir la salida en JSON
            const jsonData = JSON.parse(stdout);
            console.log(`Datos de la tabla ${tableName}:`);
            //console.log(JSON.stringify(jsonData, null, 2)); // Mostrar el JSON formateado

            const jsonArray = JSON.parse(stdout);
            const array=JSON.stringify(jsonData, null, 2);

            console.log('jsonArray tipo: '+typeof(jsonArray));
            console.log('array tipo: '+typeof(array));
            mongoose.connect(uri,option);
            console.log("Conectado a MongoDB con mongoose");
            async function connectDB(){
                try {
                    TikeoMdb.collection.drop();
                    for (const dato of jsonArray){
                        //const result = await TikeoMdb.insertMany(dato);
                        const fechaCheckTime = new Date(dato.CHECKTIME);
                            if (fechaCheckTime.getFullYear()>=2024){
                            const result = await TikeoMdb.insertMany(dato);

                            }
                    }
                    console.log(`${result.length} documentos insertados:`, result);
                } catch (error) {
                    console.error("Error al insertar datos:", error);
                }
            }
            connectDB().catch(console.error);
        } catch (parseError) {
            console.error(`Error parsing JSON: ${parseError.message}`);
        }
    });
};
module.exports = obtenerTikeosAccess;



