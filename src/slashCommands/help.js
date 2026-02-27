const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('📚 Show all available bot commands'),
    
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#ff00ff')
            .setTitle('🧠 BrainrotBot - Available Commands')
            .setDescription('*The most brainrot bot for Fortnite Creative* 💀')
            .addFields(
                { 
                    name: '🎪 Brainrot Commands',
                    value: '`/sound` - Send epic Brainrot sounds\n' +
                           '`/meme` - Random Brainrot memes\n' + 
                           '`/quote` - Legendary quotes\n' +
                           '`/rizz` - Supreme rizz lines\n' +
                           '`/sigma` - Motivational sigma phrases\n' +
                           '`/ohio` - Only in Ohio... 💀\n' +
                           '`/skibidi` - Skibidi references'
                },
                {
                    name: '🗺️ Map Commands',
                    value: '`/submit-map` - Submit your map code\n' +
                           '`/random-map` - Random map to play\n' +
                           '`/maps` - List of available maps\n' +
                           '`/vote-map` - Vote for your favorite map'
                },
                {
                    name: '🎉 Community Commands',
                    value: '`/giveaway` - Create a giveaway\n' +
                           '`/poll` - Create a poll\n' +
                           '`/leaderboard` - Top players'
                },
                {
                    name: '⚙️ General Commands',
                    value: '`/help` - This message\n' +
                           '`/ping` - Bot latency\n' +
                           '`/info` - Server info'
                }
            )
            .setFooter({ text: 'Use commands for more fun! 🎮' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
