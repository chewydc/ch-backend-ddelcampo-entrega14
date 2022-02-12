//-------------------------------------------------------------------
// Entregable 14: Loggers y GZip
// Fecha de entrega: 14-01-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
const path  = require('path');
require('dotenv').config({path: path.resolve(__dirname,'../credenciales.env')});

const credenciales = {
    MARIA_DB_CLIENT: process.env.MARIA_DB_CLIENT || 'mysql',
    MARIA_DB_HOST: process.env.MARIA_DB_HOST || 'localhost',
    MARIA_DB_PORT: process.env.MARIA_DB_PORT || '3306',
    MARIA_DB_USER: process.env.MARIA_DB_USER || 'xxx',
    MARIA_DB_PASSWORD: process.env.MARIA_DB_PASSWORD || 'xxx',
    MARIA_DB_DBNAME: process.env.MARIA_DB_DBNAME || 'MyDB',

    MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER || 'xxx',
    MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD || 'xxx',
    MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER || 'xxx.mongodb.net',
    MONGO_ATLAS_DBNAME: process.env.MONGO_ATLAS_DBNAME || 'ecommerce',

    MENSAJES_FOLDER: process.env.MENSAJES_FOLDER || 'DB',
    MENSAJES_FILENAME: process.env.MENSAJES_FILENAME || 'mensajes.txt',

    SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY || 'keysecret'
};

let fs = require('fs');
let pinoms = require('pino-multi-stream')
let  prettyStream = pinoms.prettyStream()
let logger = pinoms({
streams: [
    {stream: prettyStream },
    {level: 'warn', stream: fs.createWriteStream('warn.log')},
    {level: 'error', stream: fs.createWriteStream('error.log')}]
})
module.exports = { credenciales, logger}