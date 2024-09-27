const mongoose = require('mongoose');
const {TikeoMdb} = require('../models/TikeoEnvioMdb');  // Importa el modelo
const Users = require('../models/Users');

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
console.log('Conectando a monguito');

exports.getCheckTimesByDate = async (req,res) => {
    try {
        const tikeoPersonal = await TikeoMdb.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "USERID",
                    foreignField: "USERID",
                    as: "personalData"
                }
            },
            {
                $unwind: "$personalData"
            },
            {
                $project: {
                    USERID: 1,
                    Badgenumber: "$personalData.Badgenumber",
                    NAME: "$personalData.Name",
                    CHECKTIME: 1
                }
            }
        ]);
        
        const organizedData = tikeoPersonal.reduce((acc, record) => {
            //const checktime = new Date(record.CHECKTIME);
            const date = record.CHECKTIME.toLocaleDateString();  // Extraer la fecha sin la hora
            const time = record.CHECKTIME.toLocaleTimeString();  // Extraer la fecha sin la hora
            const mes = record.CHECKTIME.toLocaleString('es-Es', {month: 'long'});// Obtener el nombre del mes en español
            //const id = record.USERID;
            
            if (!acc[record.USERID]) {
                acc[record.USERID] = {
                    USERID: record.USERID,
                    numCi: record.Badgenumber,
                    nombre: record.NAME,
                    
                    records: {}  // Inicializar un objeto para las fechas
                    
                };
            }
            
            if (!acc[record.USERID].records[date]) {
                acc[record.USERID].records[date] = {
                     // Agregar el id al lado de la fecha
                    mes: mes,
                    date: date,
                    times: []       // Inicializar un arreglo para las horas
                };
            }
            acc[record.USERID].records[date].times.push(time);
            return acc;
        }, {});
        // Convertir el objeto en el formato deseado
        const finalResponse = [];
        // Recorrer el objeto acumulado y convertirlo en un arreglo
        for (const userId in organizedData) {
            const user = organizedData[userId];
            for (const date in user.records) {
                finalResponse.push({
                    USERID: user.USERID,
                    numCi: user.numCi,
                    nombre: user.nombre,
                    mes:user.records[date].mes,
                    date: user.records[date].date,
                    times: user.records[date].times
                });
            }
        }
        // Ordenar el arreglo final por USERID y por date
        finalResponse.sort((a, b) => {
            // Convertir id a string para evitar el error
            const idA = String(a.USERID);
            const idB = String(b.USERID);
            if (idA === idB) {
                return new Date(a.date) - new Date(b.date); // Ordenar por fecha si son del mismo USERID
            }
            return idA.localeCompare(idB); // Ordenar por USERID
        });

        // Envía los datos organizados en la respuesta
        res.status(200).json(finalResponse);
                
    } catch (error) {
        console.error('mmmm',error);
        console.error('Error fetching data:', error);
    }
};


