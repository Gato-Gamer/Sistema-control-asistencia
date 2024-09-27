
const mongoose = require('mongoose');
const {TikeoMdb} = require('../models/TikeoEnvioMdb');

const { exec } = require('child_process');
const path = require('path');

const mdbFilePath = path.resolve('bd/att2000.mdb');
const tableName = 'CHECKINOUT';
const pythonScript = path.resolve('src/funciones/prueba.py');

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/testPy', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

async function run() {
    exec(`python "${pythonScript}" "${mdbFilePath}" ${tableName}`,{ maxBuffer: 1024 * 100000 }, async (error, stdout, stderr) => {
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
            // Convertir los datos e insertarlos en MongoDB
            const insertedDocuments = await TikeoMdb.insertMany(jsonData);

            console.log(`Inserted ${insertedDocuments.length} documents into MongoDB.`);
        } catch (parseError) {
            console.error(`Error parsing JSON: ${parseError.message}`);
        }finally {
            // Cerrar la conexión a MongoDB
            mongoose.connection.close();
        }
    });
}
run().catch(error => console.error(error));

