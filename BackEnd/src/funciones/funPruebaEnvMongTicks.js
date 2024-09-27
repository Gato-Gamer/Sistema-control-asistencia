const connection = require('../database/conexionAccess');
const {mongoose,uri,option} = require('../database/conexionMongo');
const { seleccionarIdsByCi } = require('./funBuscarIdByCi');
const { seleccionarRegistrosByIds } = require('./funSelectById');
const {TikeoMdb} = require('../models/TikeoEnvioMdb');

const conAccess= require('node-adodb');

const { seleccionarDatosPorValores } = require('./funcionBuscarCi');
const storeData = require('./recibirInputData');
const { ConnectionStates } = require('mongoose');

//Para manejar el tiempo que tarda en ejecutarse
const EventEmitter = require('events');
const emitirEvento = new EventEmitter();

// Usar la función para buscar documentos en `ModeloB` con IDs obtenidos
const funcionObtenerIds = async (numCi) => {
  let tiempo = 0;
  console.log('inicio funcioObtenerIds');
  const tiempoInicio = performance.now();
   
    try {
        const userId = await seleccionarIdsByCi(numCi);
        const idPersonal = new Set (userId);
        
           ////////////////////////////////////////////////////////////////////////////////////////
      
      //Enviar datos filtrados por año y ci desde access a mongodb
      
      connection
        .query('SELECT USERID, CHECKTIME FROM CHECKINOUT ORDER BY USERID ASC, CHECKTIME ASC')
        .then(data => {
          
          const array=JSON.stringify(data, null, 2);

          //Conexion a mongoDB
          
          async function connectDB() {
            try {
              await mongoose.connect(uri,option);
              //console.log("Conectado a MongoDB con mongoose");

              const idsBuscados = new Set(userId);
              console.log("idsBuscados", typeof idsBuscados);
              console.log("idsperrsonal", typeof userId);
              const tikeoById = data.filter(registro => idsBuscados.has(registro.USERID));
              if (tikeoById.length === 0){
                  console.log('No se encontraron registros coincidentes');
              }else{
                  //console.log('Se han obtenido las siguientes coincidencias: ', tikeoById);
              }
                      
                  async function insertData() {
                    try {
                
                       //Eliminando registros
                       TikeoMdb.collection.drop();
                       // Insertar el array de objetos en la colección
                      for (const dato of tikeoById) {
                        
                        const fechaCheckTime = new Date(dato.CHECKTIME);
                        if (fechaCheckTime.getFullYear()>=2024){
                          const result = await TikeoMdb.insertMany(dato);

                        }
                      }
                        //console.log(`${result.length} documentos insertados:`, result);
                
                    } catch (err) {
                        console.error("Error al insertar datos:", err);
                    } finally {
                        // Cerrar la conexión
                        //await mongoose.connection.close();
                        console.log("Conexión a MongoDB cerrada 5555");
                    }
                }
                
                insertData().catch(console.error);

                //console.log("Nuevo usuario guardado:", newUser);
          
            } catch (err) {
                console.error("Error al conectar a MongoDB con Mongoose:", err);
            }
          }
          
          console.log('fin funObtenerIds');     
          const tiempoFin = performance.now();
          //objetoTiempo.tiempoTranscurrido = tiempoFin - tiempoInicio;
          tiempo = tiempoFin - tiempoInicio;          
          console.log(`Tiempo de ejecución funObtenerIds: ${tiempo} milisegundos`);    
          emitirEvento.emit('tiempoTranscurrido', tiempo);
          
        connectDB().catch(console.error);
        });
        
        
    } catch (error) {
        console.error('Error al usar la función seleccionarDatosPorValores:', error);
    }

        
};
const ajustarTikeos = async() => {
  const fourHoursInMilliseconds = 4 * 60 * 60 * 1000;
  console.log('Entra A ajuste de tikeos');
  try {
    await mongoose.connect(uri,option);
    TikeoMdb.updateMany(
      {},
      { $inc: { CHECKTIME: -fourHoursInMilliseconds } },
      { multi: true },
      (err, res) => {
          if (err) {
              console.error(err);
          } else {
              console.log('Se actualizaron los registros correctamente:', res);
          }
      }
  );
  } catch (error) {
    console.log(error);
  }
  console.log('Sale A ajuste de tikeos'); 
};

ajustarTikeos();
  // Exporta la función para que pueda ser utilizada en otros archivos
module.exports = {funcionObtenerIds, emitirEvento, ajustarTikeos};



