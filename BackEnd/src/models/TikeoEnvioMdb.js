const mongoose = require('mongoose');

const tikeoSchema = new mongoose.Schema({
  USERID: { type: Number, required: true },
  CHECKTIME: { type: Date}
},
{
  versionKey:false
}
);

const TikeoMdb = mongoose.model('tikeos', tikeoSchema);//ticks nombre de coleccion

module.exports = {TikeoMdb};
