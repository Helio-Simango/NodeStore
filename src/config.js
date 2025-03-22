
require('dotenv').config();

global.SALT_KEY =  process.env.SALT_KEY;
global.EMAIL_TMPL = 'Olá <strong>{0}</strong> Seja Bem vindo à Node Store';

module.exports = {
    connecionString: process.env.CONNECTIONSTRING,
    sendgridKey:  process.env.SENDGRIDKEY,
    sendgridEmail: process.env.SENDGRIDEMAIL,
    containerConnectionString: process.env.CONTAINERCONNECTIONSTRING,
}
