const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { getRandomMap } = require('../utils/mapsManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random-map')
        .setDescription('🎲 Get a random map to play'),
    
    async execute(interaction) {
        const randomMap = getRandomMap();

        if (!randomMap) {
            return await interaction.reply({
                content: '❌ No maps available yet. Use `/submit-map` to add one!',
                flags: MessageFlags.Ephemeral
            });
        }

        const embed = new EmbedBuilder()
            .setColor('#e91e63')
            .setTitle('🎲 Random Map Selected')
            .setDescription('*Time to play something random!* 🎮')
            .addFields(
                { name: '🗺️ Name', value: randomMap.name, inline: false },
                { name: '🔢 Code', value: `\`${randomMap.code}\``, inline: false },
                { name: '📝 Description', value: randomMap.description, inline: false },
                { name: '👤 Created by', value: randomMap.submittedBy, inline: true },
                { name: '⭐ Votes', value: randomMap.votes.toString(), inline: true },
                { name: '🎮 Plays', value: randomMap.plays.toString(), inline: true }
            )
            .setFooter({ text: 'BrainrotBot 🧠 | Use /vote-map to vote' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
