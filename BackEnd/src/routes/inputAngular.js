const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { storeData, getStoredData, recibirJson, emitirEvento } = require('../funciones/recibirInputData');
const {upload,obtenerUsuariosAccess,obtenerTikeosAccess} = require('../funciones/funRecibirBD');

const multer = require('multer');
const fs = require('fs');
const path = require('path');


router.use(bodyParser.json());
//Capturar datos desde input
router.post('/data', (req, res) => {
  const inputData = req.body.inputData;
  storeData(inputData);
  emitirEvento.on('tiempoTranscurrido',(nuevoTiempo) => {
    console.log('El tiempo es en inputAngular: ', nuevoTiempo);
    if (!res.headersSent) { // Verifica si los encabezados ya han sido enviados
      res.json({ message: 'Datos almacenados correctamente', data: inputData });
    } else {
      console.log('Respuesta ya enviada, no se puede enviar de nuevo.');
    } 
  });
  //res.json({ message: 'Datos almacenados correctamente', data: inputData });
  });

router.get('/data', (req, res) => {
  const data = getStoredData();
  res.json({ message: 'Datos almacenados', data: data });
});
////////////////////////
//Capturar datos desde seleccion de archivo json

//primera opcion no espera a que termine de cargar los nuevos datos
  router.post('/archivo', (req, res) => {
  const fileContent = req.body;
  recibirJson(fileContent);
  
  emitirEvento.on('tiempoTranscurrido',(nuevoTiempo) => {
    console.log('El tiempo es en inputAngular: ', nuevoTiempo);
    if (!res.headersSent) { // Verifica si los encabezados ya han sido enviados
      res.status(200).send({ message: 'Archivo JSON importado correctamente!!', data: fileContent });
    } else {
      console.log('Respuesta ya enviada, no se puede enviar de nuevo.');
    } 
  });
    
});

router.get('/archivo', (req, res) => {
  const data = recibirJson();
  res.json({ message: 'Datos almacenados', data: data });
});
//PARA ENVIAR RESPUESTA DE CARGA DEL ARCHIVO JSON EN LA BD DE ACCESS
//router.post()


//CAPTURAR ARCHIVO ENVIADO (BD.mdb) DESDE ANGULAR

router.post('/bd', upload.single('file'), (req, res)=>{
  if(req.file){
    res.status(200).send({message: 'Archivo mmmm subido exitosamente', filePath: req.file.path});
  }else{
    res.status(400).send({message: 'Error al subir el archivo'});
  }
  obtenerUsuariosAccess();
  obtenerTikeosAccess();

});

module.exports = router;
