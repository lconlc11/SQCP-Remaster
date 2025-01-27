
const Rcon = require('rcon');

class RCONHandler {
  constructor(config) {
    this.config = config; // Array of server configurations
  }

  connectToServer(serverName) {
    const serverConfig = this.config.find(server => server.name === serverName);
    if (!serverConfig) {
      throw new Error(`Server ${serverName} not found in configuration.`);
    }

    return new Rcon(serverConfig.host, serverConfig.port, serverConfig.password);
  }

  async sendCommand(serverName, command) {
    const rconConnection = this.connectToServer(serverName);

    return new Promise((resolve, reject) => {
      rconConnection.on('auth', () => {
        rconConnection.send(command);
      });

      rconConnection.on('response', (response) => {
        resolve(response);
        rconConnection.disconnect();
      });

      rconConnection.on('error', (error) => {
        reject(error);
      });

      rconConnection.connect();
    });
  }
}

module.exports = RCONHandler;
