'use strict'

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');


exports.create  = async(data) => {
    var customer = new Customer(data);
    await customer.save();
}

exports.authenticate  = async(data) => {
    const res = await Costumer.findOne({
        email: data.email,
        password: data.password
    })
    return res;
}

exports.getById  = async(id) => {
    const res = await Costumer.findById(id);
    return res;
}