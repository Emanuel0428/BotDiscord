const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('📊 Create a poll on the server')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The poll question')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('option1')
                .setDescription('First option')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('option2')
                .setDescription('Second option')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('option3')
                .setDescription('Third option (optional)')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('option4')
                .setDescription('Fourth option (optional)')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('option5')
                .setDescription('Fifth option (optional)')
                .setRequired(false)),
    
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const options = [
            interaction.options.getString('option1'),
            interaction.options.getString('option2'),
            interaction.options.getString('option3'),
            interaction.options.getString('option4'),
            interaction.options.getString('option5')
        ].filter(opt => opt !== null);

        const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];

        let description = '**Vote by reacting below:**\n\n';
        options.forEach((option, index) => {
            description += `${emojis[index]} ${option}\n`;
        });

        const embed = new EmbedBuilder()
            .setColor('#9b59b6')
            .setTitle('📊 POLL')
            .setDescription(description)
            .addFields(
                { name: '❓ Question', value: question, inline: false },
                { name: '📢 Created by', value: interaction.user.tag, inline: true },
                { name: '🗳️ Options', value: options.length.toString(), inline: true }
            )
            .setFooter({ text: 'BrainrotBot 🧠 | Vote by reacting' })
            .setTimestamp();

        const message = await interaction.reply({ embeds: [embed], fetchReply: true });

        // Add reactions for each option
        for (let i = 0; i < options.length; i++) {
            await message.react(emojis[i]);
        }
    },
};
