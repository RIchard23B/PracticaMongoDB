
const express = require('express'); 
require('dotenv').config();
const {dbConection} = require('./config/database');
const cors = require('cors');



//Creando servidor express
const app = express();

//Configuracion de CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Conexion a la BD
dbConection();
//console.log(process.env);


//Rutas de la Api
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require ('./routes/auth.routes'))

app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en el puerto ' + process.env.PORT)
});