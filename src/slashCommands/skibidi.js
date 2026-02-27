const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skibidi')
        .setDescription('🚽 Skibidi dop dop yes yes - References to the phenomenon'),
    
    async execute(interaction) {
        const skibidiRefs = [
            {
                title: 'Skibidi Toilet Original',
                description: 'It all started with a head in a toilet',
                rating: '⭐⭐⭐⭐⭐',
                vibes: '🚽💀'
            },
            {
                title: 'Cameraman Army',
                description: 'The heroes who fight against the toilets',
                rating: '⭐⭐⭐⭐',
                vibes: '📹🦾'
            },
            {
                title: 'Speaker Man',
                description: 'With his speakers of supreme power',
                rating: '⭐⭐⭐⭐⭐',
                vibes: '🔊💪'
            },
            {
                title: 'TV Man',
                description: 'The most powerful of all',
                rating: '⭐⭐⭐⭐⭐',
                vibes: '📺✨'
            },
            {
                title: 'G-Man Toilet',
                description: 'The main villain, a real boss',
                rating: '⭐⭐⭐⭐⭐',
                vibes: '🚽👔'
            },
            {
                title: 'Titan Cameraman',
                description: 'The titan of cameramen',
                rating: '⭐⭐⭐⭐⭐',
                vibes: '📹🗿'
            },
            {
                title: 'Skibidi Dance',
                description: 'The dance that started it all',
                rating: '⭐⭐⭐⭐',
                vibes: '💃🚽'
            },
            {
                title: 'Multi-Head Toilet',
                description: 'When one toilet is not enough',
                rating: '⭐⭐⭐⭐',
                vibes: '🚽🚽🚽'
            }
        ];

        const randomSkibidi = skibidiRefs[Math.floor(Math.random() * skibidiRefs.length)];

        const embed = new EmbedBuilder()
            .setColor('#00FFFF')
            .setTitle(`🚽 ${randomSkibidi.title}`)
            .setDescription(randomSkibidi.description)
            .addFields(
                { name: '⭐ Rating', value: randomSkibidi.rating, inline: true },
                { name: '💫 Vibes', value: randomSkibidi.vibes, inline: true }
            )
            .setFooter({ text: 'BrainrotBot 🧠 | Skibidi dop dop yes yes' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
