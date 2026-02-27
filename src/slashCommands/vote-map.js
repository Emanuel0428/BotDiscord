const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { voteMap, readMaps } = require('../utils/mapsManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote-map')
        .setDescription('⭐ Vote for your favorite map')
        .addStringOption(option =>
            option.setName('id')
                .setDescription('Map ID (use /maps to see IDs)')
                .setRequired(true)),
    
    async execute(interaction) {
        const mapId = interaction.options.getString('id');
        
        const maps = readMaps();
        const map = maps.find(m => m.id === mapId);

        if (!map) {
            return await interaction.reply({
                content: '❌ Map with that ID not found. Use `/maps` to see available maps.',
                flags: MessageFlags.Ephemeral
            });
        }

        const updatedMap = voteMap(mapId);

        const embed = new EmbedBuilder()
            .setColor('#f39c12')
            .setTitle('⭐ Vote Registered')
            .setDescription(`*You voted for "${updatedMap.name}"!* 🎉`)
            .addFields(
                { name: '🗺️ Map', value: updatedMap.name, inline: true },
                { name: '⭐ Total Votes', value: updatedMap.votes.toString(), inline: true },
                { name: '🔢 Code', value: `\`${updatedMap.code}\``, inline: false }
            )
            .setFooter({ text: 'BrainrotBot 🧠 | Thanks for voting!' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
