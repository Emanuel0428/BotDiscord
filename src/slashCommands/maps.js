const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { readMaps } = require('../utils/mapsManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('maps')
        .setDescription('📋 View list of all available maps'),
    
    async execute(interaction) {
        const maps = readMaps();

        if (maps.length === 0) {
            return await interaction.reply({
                content: '❌ No maps available yet. Use `/submit-map` to add one!',
                flags: MessageFlags.Ephemeral
            });
        }

        // Sort by votes
        const sortedMaps = maps.sort((a, b) => b.votes - a.votes);

        // Take first 10 maps
        const topMaps = sortedMaps.slice(0, 10);

        const embed = new EmbedBuilder()
            .setColor('#3498db')
            .setTitle('📋 Available Maps List')
            .setDescription(`*Total maps: ${maps.length}* 🗺️\n\n**Top 10 Maps:**`)
            .setFooter({ text: 'BrainrotBot 🧠 | Use /random-map to play' })
            .setTimestamp();

        topMaps.forEach((map, index) => {
            embed.addFields({
                name: `${index + 1}. ${map.name} ⭐ ${map.votes}`,
                value: `📝 ${map.description}\n🔢 Code: \`${map.code}\`\n👤 ${map.submittedBy}`,
                inline: false
            });
        });

        if (maps.length > 10) {
            embed.addFields({
                name: '📊 More maps',
                value: `And ${maps.length - 10} more maps! Use /random-map to discover them.`,
                inline: false
            });
        }

        await interaction.reply({ embeds: [embed] });
    },
};
