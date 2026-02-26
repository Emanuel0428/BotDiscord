const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { readMaps } = require('../utils/mapsManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('maps')
        .setDescription('📋 Ver lista de todos los mapas disponibles'),
    
    async execute(interaction) {
        const maps = readMaps();

        if (maps.length === 0) {
            return await interaction.reply({
                content: '❌ No hay mapas disponibles todavía. Usa `/submit-map` para añadir uno!',
                flags: MessageFlags.Ephemeral
            });
        }

        // Ordenar por votos
        const sortedMaps = maps.sort((a, b) => b.votes - a.votes);

        // Tomar los primeros 10 mapas
        const topMaps = sortedMaps.slice(0, 10);

        const embed = new EmbedBuilder()
            .setColor('#3498db')
            .setTitle('📋 Lista de Mapas Disponibles')
            .setDescription(`*Total de mapas: ${maps.length}* 🗺️\n\n**Top 10 Mapas:**`)
            .setFooter({ text: 'BrainrotBot 🧠 | Usa /random-map para jugar' })
            .setTimestamp();

        topMaps.forEach((map, index) => {
            embed.addFields({
                name: `${index + 1}. ${map.name} ⭐ ${map.votes}`,
                value: `📝 ${map.description}\n🔢 Código: \`${map.code}\`\n👤 ${map.submittedBy}`,
                inline: false
            });
        });

        if (maps.length > 10) {
            embed.addFields({
                name: '📊 Más mapas',
                value: `Y ${maps.length - 10} mapas más! Usa /random-map para descubrirlos.`,
                inline: false
            });
        }

        await interaction.reply({ embeds: [embed] });
    },
};
