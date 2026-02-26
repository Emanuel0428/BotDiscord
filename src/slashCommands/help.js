const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('📚 Muestra todos los comandos disponibles del bot'),
    
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#ff00ff')
            .setTitle('🧠 BrainrotBot - Comandos Disponibles')
            .setDescription('*El bot más brainrot de Fortnite Creative* 💀')
            .addFields(
                { 
                    name: '🎪 Comandos de Brainrot',
                    value: '`/sound` - Envía sonidos épicos de Brainrot\n' +
                           '`/meme` - Memes random de Brainrot\n' + 
                           '`/quote` - Frases legendarias\n' +
                           '`/rizz` - Líneas de rizz supremo\n' +
                           '`/sigma` - Frases sigma motivacionales\n' +
                           '`/ohio` - Only in Ohio... 💀\n' +
                           '`/skibidi` - Skibidi references'
                },
                {
                    name: '🗺️ Comandos de Mapas',
                    value: '`/submit-map` - Envía tu código de mapa\n' +
                           '`/random-map` - Mapa aleatorio para jugar\n' +
                           '`/maps` - Lista de mapas disponibles\n' +
                           '`/vote-map` - Vota por tu mapa favorito'
                },
                {
                    name: '🎉 Comandos de Comunidad',
                    value: '`/giveaway` - Crea un sorteo\n' +
                           '`/poll` - Crea una encuesta\n' +
                           '`/leaderboard` - Top jugadores'
                },
                {
                    name: '⚙️ Comandos Generales',
                    value: '`/help` - Este mensaje\n' +
                           '`/ping` - Latencia del bot\n' +
                           '`/info` - Info del servidor'
                }
            )
            .setFooter({ text: 'Usa los comandos para más diversión! 🎮' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
