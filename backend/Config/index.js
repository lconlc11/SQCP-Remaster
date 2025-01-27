const Database = require('./database.json');

const MODE = 'production';

const Config = {
  MODE,

  
    RCON: [
      {
        name: 'Server1',
        host: process.env.RCON_HOST_SERVER1 || '127.0.0.1',
        password: process.env.RCON_PASSWORD_SERVER1 || '',
        port: process.env.RCON_PORT_SERVER1 || 27028,
      },
      {
        name: 'Server2',
        host: process.env.RCON_HOST_SERVER2 || '127.0.0.2',
        password: process.env.RCON_PASSWORD_SERVER2 || '',
        port: process.env.RCON_PORT_SERVER2 || 27029,
      },
    ]
    ,

  DATABASE: {
    host: Database[MODE].host,
    user: Database[MODE].username,
    password: Database[MODE].password,
    database: Database[MODE].database,
    dialect: Database[MODE].dialect,
    port: Database[MODE].port,
  },

  LOGGER_MODULES: {
    RCON: {
      verboseness: 1,
      color: 'yellowBright',
    },

    SquadRcon: {
      verboseness: 1,
      color: 'magenta',
    },

    Express: {
      verboseness: 1,
      color: 'blueBright',
    },

    DataBase: {
      verboseness: 1,
      color: 'green',
    },
  },

  JWT: {
    Secret: process.env.JWT_SECRET || 'SomeRandomSecret123',
    Algorithm: process.env.JWT_ALGORITHM || 'HS256',
    Expiration: process.env.JWT_EXPIRATION || '30d',
  },

  API_VERSIONS: ['v1'],
  EXPRESS_PORT: process.env.PORT || 3000,
};

module.exports = Config;
