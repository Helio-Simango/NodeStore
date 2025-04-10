
'use strict'

const app =  require('../src/app');
const http = require('http');
const debug = require('debug')('balta:server');

const port = normalizedPort( process.env.PORT || 3000);
app.set('port', port);

const server = http.createServer(app);


server.listen(port);
server.on('error', onError);
server.on('Listening', onListening);
console.log('API rodando na port'+ port);

function normalizedPort(val){
     
    const port = parseInt(val, 10)

    if (isNaN(port)){
        return val;
    }

    if (port >= 0){
        return port;
    }

    return false;
}

function onError(error){

    if (error.syscall !== 'listen'){
        throw error;
    }

    const bind = typeof port == 'string' ?
          'Pipe' + port:
          'port' + port;
          
    switch (error.code){

        case 'EACCES':
            console.error(bind + 'Requires elevated previlages');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(){
    const addr = server.address();
    const bind = typeof addr == 'string' ?
    'Pipe' + port:
    'port' + port;
    debug('Listening on' + bind);
}