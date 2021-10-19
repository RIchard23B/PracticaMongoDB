
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
app.use('/api/login', require ('./routes/auth.routes'));
//Rutas Api Simples
app.use('/api/cliente', require('./routes/cliente.routes'));
app.use('/api/categoria', require('./routes/categoria.routes'));
app.use('/api/proveedor', require('./routes/proveedor.routes'));
//Rutas Api más de 1 relacion entre si
app.use('/api/order', require('./routes/order.routes'));
app.use('/api/producto', require('./routes/producto.routes'));
app.use('/api/factura', require('./routes/factura.routes'));
//Ruta Busqueda General
app.use('/api/buscar', require('./routes/busqueda.routes'));
//Ruta Cargar Imagenes
app.use('/api/uploads', require('./routes/uploads.routes'));



app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en el puerto ' + process.env.PORT)
});