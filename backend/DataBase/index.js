// Libraries
const Sequelize = require('sequelize');
const Config = require('../Config');
const Logger = require('../Utils/Logger');

// Connection CLass
class Connection {
  constructor() {
    this.connections = {};
  }

  async init() {
    await Connection.establish();
  }

  static async establish() {
    for (const [serverKey, serverConfig] of Object.entries({
      development_server1: Config.DATABASE.development_server1,
      development_server2: Config.DATABASE.development_server2
    })) {
      try {
        const sequelize = new Sequelize(serverConfig.database, serverConfig.username, serverConfig.password, {
          host: serverConfig.host,
          dialect: serverConfig.dialect,
          port: serverConfig.port,
          logging: false
        });
        await sequelize.authenticate();
        console.log(`Connection to ${serverKey} established successfully.`);
      } catch (error) {
        console.error(`Unable to connect to ${serverKey}:`, error);
      }
    }
  }

  getConnection(serverKey) {
    return this.connections[serverKey];
  }
}

// Module Exports
module.exports = new Connection();
