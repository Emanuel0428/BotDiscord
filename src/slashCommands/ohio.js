const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ohio')
        .setDescription('🌽 Only in Ohio... solo aquí pasan estas cosas'),
    
    async execute(interaction) {
        const ohioEvents = [
            'Un Skibidi Toilet apareció en el supermercado 🚽',
            'Vi a Grimace persiguiendo gente con su shake 🟣💀',
            'Los semáforos empezaron a bailar música de phonk 🚦',
            'Mi vecino se transformó en un sigma male de la nada 💪',
            'Las vacas están haciendo TikToks en el campo 🐄📱',
            'El sol se puso cuadrado como en Minecraft ☀️',
            'Los McDonald\'s están volando por el cielo 🍔✈️',
            'Vi un tornado hecho de Pizza por el Fanum Tax 🌪️🍕',
            'Los memes cobraron vida y están caminando por la calle 💀',
            'Mi auto empezó a reproducir goofy ahh sounds solo 🚗🎵',
            'El alcalde declaró el brainrot como deporte oficial 🏆',
            'Las nubes tienen forma de emojis 💀 ☁️',
            'Los perros están hablando en lenguaje de Zoomer 🐕',
            'El agua del grifo salió con sabor a Mountain Dew 💚',
            'Vi un portal a la dimensión del Skibidi en mi patio 🌀'
        ];

        const randomEvent = ohioEvents[Math.floor(Math.random() * ohioEvents.length)];

        const embed = new EmbedBuilder()
            .setColor('#FFA500')
            .setTitle('🌽 ONLY IN OHIO')
            .setDescription(`**${randomEvent}**\n\n*Solo en Ohio pueden pasar estas cosas tan random* 💀`)
            .setFooter({ text: 'BrainrotBot 🧠 | Based on a true story (maybe)' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
