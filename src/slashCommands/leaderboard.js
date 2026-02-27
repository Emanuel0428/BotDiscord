const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { getTopMaps } = require('../utils/mapsManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('🏆 Leaderboard of most voted maps'),
    
    async execute(interaction) {
        const topMaps = getTopMaps(10);

        if (topMaps.length === 0) {
            return await interaction.reply({
                content: '❌ No maps in the leaderboard yet.',
                flags: MessageFlags.Ephemeral
            });
        }

        const medals = ['🥇', '🥈', '🥉'];
        
        let description = '**The most popular maps on the server:**\n\n';
        topMaps.forEach((map, index) => {
            const medal = index < 3 ? medals[index] : `**${index + 1}.**`;
            description += `${medal} **${map.name}** - ⭐ ${map.votes} votes\n`;
            description += `   📝 ${map.description}\n`;
            description += `   🔢 \`${map.code}\` | 👤 ${map.submittedBy}\n\n`;
        });

        const embed = new EmbedBuilder()
            .setColor('#e67e22')
            .setTitle('🏆 MAPS LEADERBOARD')
            .setDescription(description)
            .setFooter({ text: 'BrainrotBot 🧠 | Use /vote-map to vote' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
