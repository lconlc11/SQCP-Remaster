
const express = require('express');
const router = express.Router();
const RCONHandler = require('../Utils/RCONHandler');
const Config = require('../Config');

const rconHandler = new RCONHandler(Config.RCON);

// Kick a player
router.post('/kick', async (req, res) => {
  const { serverName, playerName, reason } = req.body;
  try {
    const command = `kick ${playerName} ${reason || ''}`;
    const response = await rconHandler.sendCommand(serverName, command);
    res.status(200).json({ message: 'Player kicked successfully', response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ban a player
router.post('/ban', async (req, res) => {
  const { serverName, playerName, duration, reason } = req.body;
  try {
    const command = `ban ${playerName} ${duration || ''} ${reason || ''}`;
    const response = await rconHandler.sendCommand(serverName, command);
    res.status(200).json({ message: 'Player banned successfully', response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Broadcast a message
router.post('/broadcast', async (req, res) => {
  const { serverName, message } = req.body;
  try {
    const command = `broadcast ${message}`;
    const response = await rconHandler.sendCommand(serverName, command);
    res.status(200).json({ message: 'Message broadcasted successfully', response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Change the map
router.post('/map-change', async (req, res) => {
  const { serverName, mapName } = req.body;
  try {
    const command = `map ${mapName}`;
    const response = await rconHandler.sendCommand(serverName, command);
    res.status(200).json({ message: 'Map changed successfully', response });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
