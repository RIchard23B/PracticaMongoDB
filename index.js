
const express = require('express'); 
require('dotenv').config();
const {dbConection} = require('./config/database');
const cors = require('cors');



//Creando servidor express
const app = express();

//Configuracion de CORS
app.use(cors());

//Conexion a la BD
dbConection();
//console.log(process.env);


//Rutas de la Api
app.get('/', (req, res) =>{
    res.json({
        ok:true,
        msg: 'Bienvenidos a node'
    });
});


app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en el puerto ' + process.env.PORT)
});