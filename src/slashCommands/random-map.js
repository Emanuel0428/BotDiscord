const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { getRandomMap } = require('../utils/mapsManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random-map')
        .setDescription('🎲 Obtén un mapa aleatorio para jugar'),
    
    async execute(interaction) {
        const randomMap = getRandomMap();

        if (!randomMap) {
            return await interaction.reply({
                content: '❌ No hay mapas disponibles todavía. Usa `/submit-map` para añadir uno!',
                flags: MessageFlags.Ephemeral
            });
        }

        const embed = new EmbedBuilder()
            .setColor('#e91e63')
            .setTitle('🎲 Mapa Aleatorio Seleccionado')
            .setDescription('*Hora de jugar algo random!* 🎮')
            .addFields(
                { name: '🗺️ Nombre', value: randomMap.name, inline: false },
                { name: '🔢 Código', value: `\`${randomMap.code}\``, inline: false },
                { name: '📝 Descripción', value: randomMap.description, inline: false },
                { name: '👤 Creado por', value: randomMap.submittedBy, inline: true },
                { name: '⭐ Votos', value: randomMap.votes.toString(), inline: true },
                { name: '🎮 Jugadas', value: randomMap.plays.toString(), inline: true }
            )
            .setFooter({ text: 'BrainrotBot 🧠 | Usa /vote-map para votar' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
