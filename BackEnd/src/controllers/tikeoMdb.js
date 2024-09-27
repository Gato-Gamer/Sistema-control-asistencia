const {TikeoMdb} = require('../models/TikeoEnvioMdb');

exports.getAllTikeos = async (req, res) => {
  
  try {
    const tikeos20 = await TikeoMdb.find();
    res.json(tikeos20);
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener datos');
    console.log(error);
  }
};