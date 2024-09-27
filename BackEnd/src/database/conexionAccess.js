const conAccess = require('node-adodb');
const connection = conAccess.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=./bd/att2000.mdb;');

if (!connection) {
    console.error('Error al conectar a la base de datos:', ADODB.err.errorMessage);
    process.exit(1);
  }else{
     console.log('Conexión a la base de datos de Access establecida correctamente');
  }

   module.exports = connection;
   
   
  