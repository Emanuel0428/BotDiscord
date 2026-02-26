const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('challenge')
        .setDescription('🎯 Recibe un challenge random de Fortnite Creative'),
    
    async execute(interaction) {
        const challenges = [
            {
                name: 'Only Pickaxe',
                description: 'Completa un mapa usando solo el pico',
                difficulty: '⭐⭐⭐',
                reward: 'Sigma respect + 100'
            },
            {
                name: 'Speedrun Mode',
                description: 'Completa el mapa en menos de 5 minutos',
                difficulty: '⭐⭐⭐⭐',
                reward: 'W reputation'
            },
            {
                name: 'No Build Challenge',
                description: 'Juega sin construir nada',
                difficulty: '⭐⭐',
                reward: 'Based points'
            },
            {
                name: 'Backwards Only',
                description: 'Completa el mapa caminando solo hacia atrás',
                difficulty: '⭐⭐⭐⭐⭐',
                reward: 'Legendary status'
            },
            {
                name: 'Random Loadout',
                description: 'Usa solo las primeras armas que encuentres',
                difficulty: '⭐⭐⭐',
                reward: 'RNG god title'
            },
            {
                name: 'Pacifist Run',
                description: 'Completa sin eliminar a nadie',
                difficulty: '⭐⭐⭐⭐',
                reward: 'Peace keeper badge'
            },
            {
                name: 'Minimum Resources',
                description: 'Juega con solo 50 de cada material',
                difficulty: '⭐⭐⭐',
                reward: 'Efficiency master'
            },
            {
                name: 'Random Sensitivity',
                description: 'Cambia tu sensibilidad a un número aleatorio',
                difficulty: '⭐⭐⭐⭐',
                reward: 'Chaos energy'
            },
            {
                name: 'No Sprint',
                description: 'Completa sin correr',
                difficulty: '⭐⭐',
                reward: 'Patience certified'
            },
            {
                name: 'Emote After Every Kill',
                description: 'Emote obligatorio después de cada eliminación',
                difficulty: '⭐⭐⭐',
                reward: 'BM champion'
            },
            {
                name: 'Ohio Mode',
                description: 'Juega con los ojos cerrados por 30 segundos',
                difficulty: '⭐⭐⭐⭐⭐',
                reward: 'Ohio survivor'
            },
            {
                name: 'Skibidi Challenge',
                description: 'Solo puedes moverte mientras saltas',
                difficulty: '⭐⭐⭐⭐',
                reward: 'Skibidi toilet approved'
            }
        ];

        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];

        const embed = new EmbedBuilder()
            .setColor('#ff6b6b')
            .setTitle('🎯 CHALLENGE ALEATORIO')
            .setDescription(`*¿Tienes lo que se necesita?* 💪`)
            .addFields(
                { name: '🏆 Challenge', value: randomChallenge.name, inline: false },
                { name: '📝 Descripción', value: randomChallenge.description, inline: false },
                { name: '⭐ Dificultad', value: randomChallenge.difficulty, inline: true },
                { name: '🎁 Recompensa', value: randomChallenge.reward, inline: true }
            )
            .setFooter({ text: 'BrainrotBot 🧠 | Complétalo y comparte tu clip!' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
