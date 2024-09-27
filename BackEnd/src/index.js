const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRouter = require('./routes/users');
//const tikeoRouter = require('./routes/tikeos');
const tikeoRouter20 = require('./routes/tikeo20');
const tikeosOrdenados = require('./routes/tikeosOrdenados');
const getInputRouter = require('./routes/inputAngular');
const connectDB = require('./database/conexionMongo');

connectDB;
const app = express();
dotenv.config();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

console.log(port);


app.use(express.json());
app.use('/user', userRouter);

app.use('/tikeo20', tikeoRouter20);

// Usar rutas definidas en user.js
app.use('/api', getInputRouter);

app.get('/', (req, res) => {
  res.send('Servidor corriendo');
});

app.use('/tikeos', tikeosOrdenados);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
