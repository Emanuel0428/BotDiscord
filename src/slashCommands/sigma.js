const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sigma')
        .setDescription('💪 Frases motivacionales sigma grindset'),
    
    async execute(interaction) {
        const sigmaQuotes = [
            {
                quote: 'Sleep? That\'s for betas. Real sigmas grind 24/7.',
                tip: 'Tip: Sleep is overrated, victory royales aren\'t.'
            },
            {
                quote: 'While you were partying, I was mastering Fortnite Creative.',
                tip: 'Tip: Social life is temporary, K/D is forever.'
            },
            {
                quote: 'I don\'t chase dreams, I build them in Creative Mode.',
                tip: 'Tip: Be the architect of your own empire.'
            },
            {
                quote: 'Relationships? I\'m in a committed relationship with the grind.',
                tip: 'Tip: Love is temporary, grinding is eternal.'
            },
            {
                quote: 'I don\'t need luck, I need dedication and a 240Hz monitor.',
                tip: 'Tip: Winners don\'t wait for opportunities, they create them.'
            },
            {
                quote: 'Failure is not an option, it\'s a learning experience.',
                tip: 'Tip: Every death is a lesson, every win is earned.'
            },
            {
                quote: 'They laugh at my grindset today, they\'ll fear it tomorrow.',
                tip: 'Tip: Let your success be your noise.'
            },
            {
                quote: 'I\'m not playing games, I\'m building a legacy.',
                tip: 'Tip: Think legacy, not temporary wins.'
            },
            {
                quote: 'Coffee? No. Determination? Yes.',
                tip: 'Tip: Fuel your grind with pure willpower.'
            },
            {
                quote: 'The only competition is yourself from yesterday.',
                tip: 'Tip: Be 1% better every day.'
            }
        ];

        const randomSigma = sigmaQuotes[Math.floor(Math.random() * sigmaQuotes.length)];

        const embed = new EmbedBuilder()
            .setColor('#2c3e50')
            .setTitle('💪 Sigma Grindset Philosophy')
            .setDescription(`**"${randomSigma.quote}"**`)
            .addFields({ name: '🎯 Pro Tip', value: randomSigma.tip })
            .setThumbnail('https://i.imgur.com/sigma-male-icon.png')
            .setFooter({ text: 'BrainrotBot 🧠 | Never stop grinding' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
