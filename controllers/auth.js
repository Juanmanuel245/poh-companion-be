const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) =>{

    const { password, email } = req.body;

    
    try {

        let user = await User.findOne({ username });
        
        if ( user ){
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese nombre.'
            }) 
        }

        user = new User( req.body );


        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
        user.role = 'registred';

        await user.save();

        // Generar JWT
        const token = await generarJWT( user.id, user.username);

        return res.status(201).json({
            ok: true,
            uid: user.id,
            username: user.username,
            role: user.role,
            token
        })


    } catch (error) {
        console.log(error); 
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador.'
        })      
    }


    
};

const loginUser = async (req, res = response) =>{

    const { password, username } = req.body;

    try {

        const user = await User.findOne({ username });
        if ( !user ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o contraseña no son correctas'
            }) 
        }

        // Confirmar password
        const validPassword = bcrypt.compareSync( password, user.password );

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o contraseña no son correctas'
            })
        }

        // Generar JWT
        const token = await generarJWT( user.id, user.username);

        return res.json({
            ok: true,
            msg: 'login',
            uid: user.id,
            username: user.username,
            token,
            role: user.role
        })



        
    } catch (error) {
        console.log(error); 
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador.'
        }) 
    }

    
};

const renewToken = async (req, res = response) =>{
    const { uid, username } = req;

    // Generar un nuevo JWT
    const token = await generarJWT(uid, username);

    const { role } = await User.findOne({ _id : uid }).select('role');

    res.json({ok: true,token, uid, role})
};

module.exports = {
    createUser,
    loginUser,
    renewToken
}