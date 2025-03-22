'use strict'

const ValidationContract = require('../validators/fluent-validator'); 
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const authService = require('../services/auth-service')

const emailService = require('../services/email-service');

exports.post = async (req, res, next) =>{
    
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3 , 'O Nome deve ter pelo menos tres caracteres');
    contract.isEmail(req.body.email,'E-mail invalido');
    contract.hasMinLen(req.body.password, 6 , 'A senha deve ter pelo menos 6 caracteres');

    // se os dados forem invalidos
    if(!contract.isValid()){
        res.status(400).send(contract.erros()).end(); // the status code 400 stans for bad request
        return;
    }
    
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY), // criptografia da senha
            roles: ['user']
        });

        emailService.send(req.body.email, 'Bem vindo ao Node Store', global.EMAIL_TMPL.replace('{0}', req.body.name));

        res.status(201).send({
            messagem: 'Usuario cadastrado com sucesso!'
        });   
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requisição' 
        });
    }
        
};

exports.authenticate = async (req, res, next) =>{ 
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY) // criptografia da senha
        });

        if(!customer){
            res.status(404).send({
                message: 'Usuario ou senha invalidos'
            })
        }

        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email, 
            name: customer.name,
            roles: customer.roles
        })

        res.status(201).send({
            token: token,
            data: {
                mail: customer.email, 
                name: customer.name,
            }
        });   
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requisição' 
        });
    } 
};

exports.refreshToken = async (req, res, next) =>{ 
    try {
        const token = req.body.token || req.query.token || req.headers['x-acesses-token']
        const data = await authService.decodeToken(token);

        const customer = await repository.getById(data.id);

        if(!customer){
            res.status(404).send({
                message: 'Cliente não encontrado'
            })
            return;
        }

        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email, 
            name: customer.name,
            roles: customer.roles
        })

        res.status(201).send({
            token: tokenData,
            data: {
                mail: customer.email, 
                name: customer.name,
            }
        });   
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requisição' 
        });
    } 
};