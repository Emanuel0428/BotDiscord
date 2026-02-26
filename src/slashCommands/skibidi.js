const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skibidi')
        .setDescription('🚽 Skibidi dop dop yes yes - Referencias al fenómeno'),
    
    async execute(interaction) {
        const skibidiRefs = [
            {
                title: 'Skibidi Toilet Original',
                description: 'Todo empezó con una cabeza en un WC',
                rating: '⭐⭐⭐⭐⭐',
                vibes: '🚽💀'
            },
            {
                title: 'Cameraman Army',
                description: 'Los héroes que luchan contra los toilets',
                rating: '⭐⭐⭐⭐',
                vibes: '📹🦾'
            },
            {
                title: 'Speaker Man',
                description: 'Con sus bocinas de poder supremo',
                rating: '⭐⭐⭐⭐⭐',
                vibes: '🔊💪'
            },
            {
                title: 'TV Man',
                description: 'El más poderoso de todos',
                rating: '⭐⭐⭐⭐⭐',
                vibes: '📺✨'
            },
            {
                title: 'G-Man Toilet',
                description: 'El villano principal, todo un boss',
                rating: '⭐⭐⭐⭐⭐',
                vibes: '🚽👔'
            },
            {
                title: 'Titan Cameraman',
                description: 'El titan de los cameramen',
                rating: '⭐⭐⭐⭐⭐',
                vibes: '📹🗿'
            },
            {
                title: 'Skibidi Dance',
                description: 'El baile que empezó todo esto',
                rating: '⭐⭐⭐⭐',
                vibes: '💃🚽'
            },
            {
                title: 'Multi-Head Toilet',
                description: 'Cuando un WC no es suficiente',
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
