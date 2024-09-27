const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  USERID: { type: Number, required: true },
  Badgenumber: { type: Number },
  Name: { type: String },
},
{
  versionKey:false
});

const Users = mongoose.model('users', usersSchema);

module.exports = Users;//{Users} para escribir, Users para leer
