const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { addMap } = require('../utils/mapsManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('submit-map')
        .setDescription('🗺️ Envía tu código de mapa de Fortnite Creative')
        .addStringOption(option =>
            option.setName('codigo')
                .setDescription('Código del mapa (formato: 0000-0000-0000)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('nombre')
                .setDescription('Nombre del mapa')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('descripcion')
                .setDescription('Descripción breve del mapa')
                .setRequired(true)),
    
    async execute(interaction) {
        const code = interaction.options.getString('codigo');
        const name = interaction.options.getString('nombre');
        const description = interaction.options.getString('descripcion');

        // Validar formato del código
        const codePattern = /^\d{4}-\d{4}-\d{4}$/;
        if (!codePattern.test(code)) {
            return await interaction.reply({
                content: '❌ Formato de código inválido. Usa el formato: 0000-0000-0000',
                flags: MessageFlags.Ephemeral
            });
        }

        try {
            const newMap = addMap({
                code: code,
                name: name,
                description: description,
                submittedBy: interaction.user.tag
            });

            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('✅ Mapa Enviado Exitosamente')
                .setDescription('*Tu mapa ha sido añadido a la colección!* 🎉')
                .addFields(
                    { name: '🗺️ Nombre', value: name, inline: false },
                    { name: '🔢 Código', value: `\`${code}\``, inline: false },
                    { name: '📝 Descripción', value: description, inline: false },
                    { name: '👤 Enviado por', value: interaction.user.tag, inline: true },
                    { name: '🎮 ID del Mapa', value: newMap.id, inline: true }
                )
                .setFooter({ text: 'BrainrotBot 🧠 | Usa /maps para ver todos' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: '❌ Hubo un error al guardar el mapa. Intenta de nuevo.',
                flags: MessageFlags.Ephemeral
            });
        }
    },
};
