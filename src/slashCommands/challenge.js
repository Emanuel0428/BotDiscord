const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('challenge')
        .setDescription('🎯 Receive a random Fortnite Creative challenge'),
    
    async execute(interaction) {
        const challenges = [
            {
                name: 'Only Pickaxe',
                description: 'Complete a map using only the pickaxe',
                difficulty: '⭐⭐⭐',
                reward: 'Sigma respect + 100'
            },
            {
                name: 'Speedrun Mode',
                description: 'Complete the map in less than 5 minutes',
                difficulty: '⭐⭐⭐⭐',
                reward: 'W reputation'
            },
            {
                name: 'No Build Challenge',
                description: 'Play without building anything',
                difficulty: '⭐⭐',
                reward: 'Based points'
            },
            {
                name: 'Backwards Only',
                description: 'Complete the map walking only backwards',
                difficulty: '⭐⭐⭐⭐⭐',
                reward: 'Legendary status'
            },
            {
                name: 'Random Loadout',
                description: 'Use only the first weapons you find',
                difficulty: '⭐⭐⭐',
                reward: 'RNG god title'
            },
            {
                name: 'Pacifist Run',
                description: 'Complete without eliminating anyone',
                difficulty: '⭐⭐⭐⭐',
                reward: 'Peace keeper badge'
            },
            {
                name: 'Minimum Resources',
                description: 'Play with only 50 of each material',
                difficulty: '⭐⭐⭐',
                reward: 'Efficiency master'
            },
            {
                name: 'Random Sensitivity',
                description: 'Change your sensitivity to a random number',
                difficulty: '⭐⭐⭐⭐',
                reward: 'Chaos energy'
            },
            {
                name: 'No Sprint',
                description: 'Complete without sprinting',
                difficulty: '⭐⭐',
                reward: 'Patience certified'
            },
            {
                name: 'Emote After Every Kill',
                description: 'Mandatory emote after every elimination',
                difficulty: '⭐⭐⭐',
                reward: 'BM champion'
            },
            {
                name: 'Ohio Mode',
                description: 'Play with your eyes closed for 30 seconds',
                difficulty: '⭐⭐⭐⭐⭐',
                reward: 'Ohio survivor'
            },
            {
                name: 'Skibidi Challenge',
                description: 'You can only move while jumping',
                difficulty: '⭐⭐⭐⭐',
                reward: 'Skibidi toilet approved'
            }
        ];

        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];

        const embed = new EmbedBuilder()
            .setColor('#ff6b6b')
            .setTitle('🎯 RANDOM CHALLENGE')
            .setDescription(`*Do you have what it takes?* 💪`)
            .addFields(
                { name: '🏆 Challenge', value: randomChallenge.name, inline: false },
                { name: '📝 Description', value: randomChallenge.description, inline: false },
                { name: '⭐ Difficulty', value: randomChallenge.difficulty, inline: true },
                { name: '🎁 Reward', value: randomChallenge.reward, inline: true }
            )
            .setFooter({ text: 'BrainrotBot 🧠 | Complete it and share your clip!' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
