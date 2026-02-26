const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { getTopMaps } = require('../utils/mapsManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('🏆 Tabla de clasificación de mapas más votados'),
    
    async execute(interaction) {
        const topMaps = getTopMaps(10);

        if (topMaps.length === 0) {
            return await interaction.reply({
                content: '❌ No hay mapas en el leaderboard todavía.',
                flags: MessageFlags.Ephemeral
            });
        }

        const medals = ['🥇', '🥈', '🥉'];
        
        let description = '**Los mapas más populares del servidor:**\n\n';
        topMaps.forEach((map, index) => {
            const medal = index < 3 ? medals[index] : `**${index + 1}.**`;
            description += `${medal} **${map.name}** - ⭐ ${map.votes} votos\n`;
            description += `   📝 ${map.description}\n`;
            description += `   🔢 \`${map.code}\` | 👤 ${map.submittedBy}\n\n`;
        });

        const embed = new EmbedBuilder()
            .setColor('#e67e22')
            .setTitle('🏆 LEADERBOARD DE MAPAS')
            .setDescription(description)
            .setFooter({ text: 'BrainrotBot 🧠 | Usa /vote-map para votar' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
