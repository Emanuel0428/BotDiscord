const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { voteMap, readMaps } = require('../utils/mapsManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vote-map')
        .setDescription('⭐ Vota por tu mapa favorito')
        .addStringOption(option =>
            option.setName('id')
                .setDescription('ID del mapa (usa /maps para ver los IDs)')
                .setRequired(true)),
    
    async execute(interaction) {
        const mapId = interaction.options.getString('id');
        
        const maps = readMaps();
        const map = maps.find(m => m.id === mapId);

        if (!map) {
            return await interaction.reply({
                content: '❌ No se encontró el mapa con ese ID. Usa `/maps` para ver los mapas disponibles.',
                flags: MessageFlags.Ephemeral
            });
        }

        const updatedMap = voteMap(mapId);

        const embed = new EmbedBuilder()
            .setColor('#f39c12')
            .setTitle('⭐ Voto Registrado')
            .setDescription(`*Has votado por "${updatedMap.name}"!* 🎉`)
            .addFields(
                { name: '🗺️ Mapa', value: updatedMap.name, inline: true },
                { name: '⭐ Total de Votos', value: updatedMap.votes.toString(), inline: true },
                { name: '🔢 Código', value: `\`${updatedMap.code}\``, inline: false }
            )
            .setFooter({ text: 'BrainrotBot 🧠 | Gracias por votar!' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
