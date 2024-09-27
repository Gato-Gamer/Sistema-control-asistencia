
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const obtenerUsuariosAccess = require('../funciones/funEnviarMongoUsers');
const obtenerTikeosAccess = require('./funPyPrueba');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = 'bd/';
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        //Define un nombre en especifico para el archivo
        const nombreArchivo = 'att2000';
        //const extension = path.extname(file.originalname);
      cb(null, nombreArchivo + path.extname(file.originalname));
    }
    
  }
);
  
  const upload = multer({ storage: storage });
  
  module.exports = {
    upload,obtenerUsuariosAccess,
    obtenerTikeosAccess
  };