const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const {generarJWT} = require('../helpers/jwt')



const login = async(req, res=response) => {
    const{email, password} = req.body;


    try{

        //verificar al usuario por su email

        const usuariosDB = await Usuario.findOne({email});
        if(!usuariosDB) {
            return res.status(404).json({
                ok:false,
                msg: 'Email no encontrado'
                
            });
        }

        const validPassword = bcrypt.compareSync(password, usuariosDB.password);

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'Contraseña no valida'
            });
        }

        //Generar Token -- JWT
        const token = await generarJWT( usuariosDB ); 

        res.json({
            ok:true,
            token
        });


    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    login,
}