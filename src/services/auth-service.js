'use strict'

const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '24h' });
}

exports.decodeToken = async (token) =>{
    let data = await  jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.authorize = function (req, res, next){
    let token = req.body.token || req.query.token || req.headers['x-acesses-token']

    if(!token){
        res.status(401).json({
            message: 'Acesso Restrito'
        })
    } else{
        jwt.verify(token, global.SALT_KEY, function (error, decoded){
            if(error){
                res.status(401).json({
                    message: 'Token Invalido'
                })
            }else{
                next();
            }
        });
    }
}

exports.isAdmin = function (req, res, next){
    let token = req.body.token || req.query.token || req.headers['x-acesses-token']

    if(!token){
        res.status(401).json({
            message: 'Token Invalido'
        })
    } else{
        jwt.verify(token, global.SALT_KEY, function (error, decoded){
            if(error){
                res.status(401).json({
                    message: 'Token Invalido'
                })
            }else{
               if(decoded.roles.includes('admin')){
                    next();
               }else{
                    res.status(403).json({
                        message: 'Esta funcionalidade é restrita para administradores'
                    });
               }
            }
        });
    }
}