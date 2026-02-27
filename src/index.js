require('dotenv').config();
const { Client, Collection, GatewayIntentBits, MessageFlags } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Load config.json if exists, otherwise use empty object
let config = {};
try {
    config = require('../config.json');
} catch (error) {
    console.log('ℹ️ config.json not found, using environment variables');
}

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers
    ] 
});

// Load slash commands
client.slashCommands = new Collection();
const slashCommandsPath = path.join(__dirname, 'slashCommands');
const slashCommandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));

for (const file of slashCommandFiles) {
    const filePath = path.join(slashCommandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.slashCommands.set(command.data.name, command);
        console.log(`[Slash Command] ${command.data.name} loaded.`);
    } else {
        console.log(`[WARNING] Command at ${filePath} doesn't have "data" or "execute".`);
    }
}

client.on('clientReady', () => {
    console.log(`✅ Bot connected as ${client.user.tag}`);
    console.log(`🎮 Server: ${process.env.SERVER || config.server || 'BrainrotServer'}`);
    console.log(`🧠 Mode: BRAINROT ACTIVATED 💀`);
    
    // Set bot status
    client.user.setPresence({
        activities: [{ name: '🧠 Brainrot Maps | /help' }],
        status: 'online',
    });
});

// Handle slash command interactions
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.slashCommands.get(interaction.commandName);

    if (!command) {
        console.error(`Command not found ${interaction.commandName}`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing ${interaction.commandName}:`, error);
        const errorMessage = { content: '❌ There was an error executing this command.', flags: MessageFlags.Ephemeral };
        
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(errorMessage);
        } else {
            await interaction.reply(errorMessage);
        }
    }
});

// Simple HTTP server for health checks (UptimeRobot)
const http = require('http');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/health' || req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Bot OK - Running');
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`🌐 Health check server listening on port ${PORT}`);
});

// Use environment variables if they exist, otherwise use config.json
const token = process.env.TOKEN || config.token;
client.login(token);