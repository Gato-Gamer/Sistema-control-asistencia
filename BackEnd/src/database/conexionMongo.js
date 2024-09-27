const mongoose = require('mongoose');

//const uri = 'mongodb://localhost:27017/testPy'; descomentar luego
const uri = 'mongodb://localhost:27017/test';
const option = {};

mongoose.connect(uri, option).then(() => console.log("Conectado a MongoDB"))
    .catch(err => console.log(err));

    module.exports = {mongoose, uri, option};
    