require('dotenv').config();
const { Client, Collection, GatewayIntentBits, MessageFlags } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Cargar config.json si existe, sino usar objeto vacío
let config = {};
try {
    config = require('../config.json');
} catch (error) {
    console.log('ℹ️ config.json no encontrado, usando variables de entorno');
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

// Cargar slash commands
client.slashCommands = new Collection();
const slashCommandsPath = path.join(__dirname, 'slashCommands');
const slashCommandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));

for (const file of slashCommandFiles) {
    const filePath = path.join(slashCommandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.slashCommands.set(command.data.name, command);
        console.log(`[Slash Command] ${command.data.name} cargado.`);
    } else {
        console.log(`[WARNING] El comando en ${filePath} no tiene "data" o "execute".`);
    }
}

client.on('clientReady', () => {
    console.log(`✅ Bot conectado como ${client.user.tag}`);
    console.log(`🎮 Servidor: ${process.env.SERVER || config.server || 'BrainrotServer'}`);
    console.log(`🧠 Modo: BRAINROT ACTIVADO 💀`);
    
    // Establecer estado del bot
    client.user.setPresence({
        activities: [{ name: '🧠 Mapas de Brainrot | /help' }],
        status: 'online',
    });
});

// Manejar interacciones de slash commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.slashCommands.get(interaction.commandName);

    if (!command) {
        console.error(`No se encontró el comando ${interaction.commandName}`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error ejecutando ${interaction.commandName}:`, error);
        const errorMessage = { content: '❌ Hubo un error al ejecutar este comando.', flags: MessageFlags.Ephemeral };
        
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp(errorMessage);
        } else {
            await interaction.reply(errorMessage);
        }
    }
});

// Servidor HTTP simple para health checks (UptimeRobot)
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

// Usar variables de entorno si existen, sino usar config.json
const token = process.env.TOKEN || config.token;
client.login(token);