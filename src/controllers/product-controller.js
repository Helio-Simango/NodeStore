
'use strict'

const ValidationContract = require('../validators/fluent-validator') 
const repository = require('../repositories/product-repository');

exports.get =  async(req, res, next) =>{
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requesição'
        });
    }
}

exports.getBySlug = async (req, res, next) =>{
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requesição'
        });
    }
}

exports.getById = async (req, res, next) =>{
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requesição'
        });
    }
}

exports.getByTag = async (req, res, next) =>{
    try {
        const data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requesição'
        });
    }
}

exports.post = async (req, res, next) =>{
    
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3 , 'O titulo deve ter pelo menos tres caracteres');
    contract.hasMinLen(req.body.slug, 3 , 'O Slug deve ter pelo menos tres caracteres');
    contract.hasMinLen(req.body.description, 3 , 'A Descrição deve ter pelo menos tres caracteres');

    // se os dados forem invalidos
    if(!contract.isValid()){
        res.status(400).send(contract.erros()).end(); // the status code 400 stans for bad request
        return;
    }
    
    try {
        await repository.create(req.body);
        res.status(201).send({
            messagem: 'Produto cadastrado com sucesso!'
        });   
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requisição' 
        });
    }
        
};

exports.put = async (req, res, next) => {
   
      try {
        await repository.update(req.params.id, req.body)
            res.status(200).send({
                message: 'Produto actulizado com sucesso!'
            });
      } catch (e) {
            res.status(500).send({
                message: 'Falha ao processar a requisição' 
            });
      }
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id)
            res.status(200).send({
                messagem: 'Produto removido com sucesso!'
            });    
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar a requisição' 
        });
    }
          
};