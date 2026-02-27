const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { addMap } = require('../utils/mapsManager');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('submit-map')
        .setDescription('🗺️ Submit your Fortnite Creative map code')
        .addStringOption(option =>
            option.setName('code')
                .setDescription('Map code (format: 0000-0000-0000)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Map name')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('description')
                .setDescription('Brief map description')
                .setRequired(true)),
    
    async execute(interaction) {
        const code = interaction.options.getString('code');
        const name = interaction.options.getString('name');
        const description = interaction.options.getString('description');

        // Validate code format
        const codePattern = /^\d{4}-\d{4}-\d{4}$/;
        if (!codePattern.test(code)) {
            return await interaction.reply({
                content: '❌ Invalid code format. Use format: 0000-0000-0000',
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
                .setTitle('✅ Map Submitted Successfully')
                .setDescription('*Your map has been added to the collection!* 🎉')
                .addFields(
                    { name: '🗺️ Name', value: name, inline: false },
                    { name: '🔢 Code', value: `\`${code}\``, inline: false },
                    { name: '📝 Description', value: description, inline: false },
                    { name: '👤 Submitted by', value: interaction.user.tag, inline: true },
                    { name: '🎮 Map ID', value: newMap.id, inline: true }
                )
                .setFooter({ text: 'BrainrotBot 🧠 | Use /maps to see all' })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: '❌ There was an error saving the map. Try again.',
                flags: MessageFlags.Ephemeral
            });
        }
    },
};
