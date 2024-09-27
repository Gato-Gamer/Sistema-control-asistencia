
const { seleccionarIdsByCi } = require('./funBuscarIdByCi');
const {TikeoMdb} = require('../models/TikeoEnvioMdb');
const conAccess = require('node-adodb');

const {funcionObtenerIds, emitirEvento} = require('./funPruebaEnvMongTicks')

let storedData = null;
let contenidoData= null;

function storeData(inputData) {
  storedData = parseInt(inputData);
  console.log('Datos almacenados:', storedData);
  // Ejecuta la función pasando los parámetros necesarios
    (async () => {
        console.log('storedData: ',storedData);
        console.log('tipo storedData', typeof storedData)
        const ids = funcionObtenerIds([0,storedData]);
        console.log('Resultado de la función:', ids);
    })();
}

function getStoredData() {
  return storedData;
}

//Almacenar datos desde archivo json
//opcion 
function recibirJson(fileContent) {
  //storedData = parseInt(inputData);
  console.log('fileContent: ', fileContent);
  console.log('Datos almacenados:', contenidoData);
  // Ejecuta la función pasando los parámetros necesarios
  
  (async () =>{
    const tiempoInicio = performance.now();
    const ids = funcionObtenerIds(fileContent);
    const tiempoFin = performance.now();
    const tiempoTranscurrid = tiempoFin - tiempoInicio;
    console.log(`Tiempo de ejecución recibirjson: ${tiempoTranscurrid} milisegundos`);
    console.log('Resultado de la funcion: ', ids);
  })();
  
}

module.exports = {
  storeData,
  getStoredData,
  recibirJson,
  emitirEvento
};
