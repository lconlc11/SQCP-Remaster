const Database = require('./database.json');

const MODE = 'production';

const Config = {
  MODE,

  RCON: {
    host: process.env.RCON_HOST || 'localhost',
    password: process.env.RCON_PASSWORD || 'password',
    port: process.env.RCON_PORT || 21114,
  },

  DATABASE: {
    development_server1: Database.development_server1,
    development_server2: Database.development_server2,
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
