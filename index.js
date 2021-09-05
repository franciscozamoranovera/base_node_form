const express = require('express');
const http = require('http');
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const { sequelize } = require("./database/database")
const app = express();

const { PORT } = process.env; //process.env referencia al archivo .env

//Routes
const taskRoutes = require('./routes/tasks.routes');

const prefix = '/api/v1';

//Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(prefix, taskRoutes);

//Routes initialization
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Tasks API',
        author:"Francisco Zamorano"
    })
});

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`server on port ${PORT}`);
    sequelize
        .sync({ force: false }) //(migrations in sequelize) change to true in production 
        .then(() => console.log("conectados a la base de datos"))
        .catch(error => console.log('Se ha producido un error', error))
});