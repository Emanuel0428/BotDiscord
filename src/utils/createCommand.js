require('dotenv').config();
const fs = require("fs");
const { REST, Routes } = require("discord.js");

// Load config.json if exists, otherwise use empty object
let config = {};
try {
    config = require("../../config.json");
} catch (error) {
    console.log('ℹ️ config.json not found, using environment variables');
}

const commands = [];
const slashCommandsFiles = fs
  .readdirSync("./src/slashCommands")
  .filter((file) => file.endsWith("js"));

for (const file of slashCommandsFiles) {
  const slash = require(`../slashCommands/${file}`);
  commands.push(slash.data.toJSON());
}

// Usar variables de entorno si existen, sino usar config.json
const token = process.env.TOKEN || config.token;
const botId = process.env.BOT_ID || config.botId;

const rest = new REST({ version: "10" }).setToken(token);

createSlash();

async function createSlash() {
  try {
    await rest.put(Routes.applicationCommands(botId), {
      body: commands,
    });
    console.log("[Slash Commands] Added.");
  } catch (e) {
    console.error(e);
  }
}