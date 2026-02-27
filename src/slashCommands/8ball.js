const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('🔮 Ask the brainrot magic 8ball something')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('Your question')
                .setRequired(true)),
    
    async execute(interaction) {
        const question = interaction.options.getString('question');

        const responses = [
            // Positive responses
            'Yes, 100% sure on god fr fr 💯',
            'No doubt, that\'s bussin 🔥',
            'The signs point to a resounding yes 🎯',
            'Of course yes my friend, skibidi approved ✅',
            'I think so, sigma energy detected 💪',
            'Of course, W take bro 🏆',
            'Yes yes yes, skibidi dop dop 🚽',
            'Obviously yes, based and redpilled 📕',
            // Negative responses
            'Nah, that\'s an L take 👎',
            'I don\'t see it clearly, mid energy 😐',
            'Better not, that\'s not bussin 🚫',
            'Nope, that cap is too strong 🧢',
            'I don\'t think so, only in Ohio would that happen 🌽',
            'Negative soldier, beta move 📉',
            'That\'s a no, goofy ahh question 🤪',
            'Better forget it, NPC behavior 💀',
            // Neutral responses
            'Ask again later, I\'m on my grind 💼',
            'I\'m not sure, consult with the rizz council 🤔',
            'The answer is not clear, too sigma to decide 🌫️',
            'Concentrate and ask again, skibidi confusion 🔄',
            'It\'s a 50/50 bro, flip it in Fortnite 🎲',
            'Depends on your mindset, sigma or beta? 🤷'
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        const embed = new EmbedBuilder()
            .setColor('#9b59b6')
            .setTitle('🔮 The Brainrot Magic 8Ball Says...')
            .addFields(
                { name: '❓ Your Question', value: question, inline: false },
                { name: '💭 Answer', value: randomResponse, inline: false }
            )
            .setFooter({ text: 'BrainrotBot 🧠 | 100% accurate (maybe)' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
