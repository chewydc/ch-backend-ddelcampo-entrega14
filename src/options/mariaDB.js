//-------------------------------------------------------------------
// Entregable 14: Loggers y GZip
// Fecha de entrega: 14-01-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
const config = require('../config');

const optionsMariaDB = {
    client: config.credenciales.MARIA_DB_CLIENT,
    connection: {
      host : config.credenciales.MARIA_DB_HOST,
      port : config.credenciales.MARIA_DB_PORT,
      user : config.credenciales.MARIA_DB_USER,
      password : config.credenciales.MARIA_DB_PASSWORD,
      database : config.credenciales.MARIA_DB_DBNAME
    }
  };

  module.exports = { optionsMariaDB }