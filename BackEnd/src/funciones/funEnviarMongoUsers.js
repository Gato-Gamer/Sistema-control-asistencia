'use strict';

const connection = require('../database/conexionAccess')
const {mongoose,uri,option}= require('../database/conexionMongo');

const Users = require('../models/Users');

//////////////////////////////////////////////////////////////////////////////////////

// Query Users

const obtenerUsuariosAccess = async() => {
    connection
    .query('SELECT USERID, Badgenumber, Name FROM USERINFO ORDER BY USERID ASC')
    .then(data => {

        console.log('Valor de data: ', data);
        const array=JSON.stringify(data, null, 2);
        console.log('data tipo: '+typeof(data));
        //Conexion a mongoDB
        async function connectDB() {
        try {
            //Conectar a mongoDB
            await mongoose.connect(uri,option);
            console.log("Conectado a MongoDB con mongoose");
                 
                async function insertData() {
                try {
                    
                    Users.collection.drop();
                    for (const dato of data) {
                        const result = await Users.insertMany(dato);
                        
                    }

                    //console.log(`${result.length} documentos insertados:`, result);
            
                } catch (err) {
                    console.error("Error al insertar datos:", err);
                } finally {
                    // Cerrar la conexión
                    //await mongoose.connection.close();
                    console.log("Conexión a MongoDB cerrada");
                }
            }
            insertData().catch(console.error);

            //console.log("Nuevo usuario guardado:", newUser);
        
        } catch (err) {
            console.error("Error al conectar a MongoDB con Mongoose:", err);
        }
        }
            
    connectDB().catch(console.error);

    ///Fin conexion mongoDB

    })
    .catch(error => {
        console.error(error);
    });
};

//obtenerUsuariosAccess();
 module.exports = obtenerUsuariosAccess;
