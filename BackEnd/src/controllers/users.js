const Users = require('../models/Users');

exports.getAllPersonal = async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener productos');
  }
};


