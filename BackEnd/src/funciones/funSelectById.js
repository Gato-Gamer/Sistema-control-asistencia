const conAccess = require('node-adodb');

function seleccionarRegistrosByIds(idsPersonal) {
    const connection = conAccess.open('Provider=Microsoft.Jet.OLEDB.4.0;Data Source=./bd/att2000.mdb;');

    connection.query('SELECT USERID, CHECKTIME FROM CHECKINOUT').then(async data => {
              
                const idsBuscados = new Set(idsPersonal);
                console.log("idsBuscados", typeof idsBuscados);
                console.log("idsperrsonal", typeof idsPersonal);
                const tikeoById = data.filter(registro => idsBuscados.has(registro.USERID));
                if (tikeoById.length === 0){
                    console.log('No se encontraron registros coincidentes');
                }else{
                    //console.log(registroCoincidencias);
                }
            
            //console.log('Encontrado: ', registroCoincidencias);
            console.log('Encontrado: ', tikeoById);

            const cadena = JSON.stringify(tikeoById, null, 2);

            // Retornar los documentos encontrados
            return cadena;
       

    });
}

// Exportar la función
module.exports = { seleccionarRegistrosByIds };

