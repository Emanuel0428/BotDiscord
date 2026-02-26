const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rizz')
        .setDescription('😎 Líneas de rizz supremo para conquistar'),
    
    async execute(interaction) {
        const rizzLines = [
            'Are you a Fortnite map? Because I want to explore every corner of you 🗺️',
            'Damn shawty, you got that GYATT fr fr 🗣️',
            'Are you from Ohio? Because you\'re unreal 💀',
            'I must be in Creative Mode because I\'m building a future with you 🏗️',
            'Are you a Victory Royale? Because you\'re the only win I need 👑',
            'You got more rizz than a max level battlepass 😎',
            'Forget Fanum Tax, you can have 100% of my heart 💖',
            'Are you a Skibidi Toilet? Because you flush away all my worries 🚽',
            'Baby you\'re not just bussin, you\'re the whole restaurant 🍽️',
            'Are you a Grimace Shake? Because one taste and I\'m gone 🟣',
            'You must be a sigma, because you\'re always grinding on my mind 💪',
            'Damn girl, you put the "hot" in "hotdrop" 🔥',
            'Are you a legendary chest? Because finding you was the best loot 🎁',
            'You got that W rizz on god fr fr no cap 🧢',
            'I don\'t need a Launch Pad to fall for you 💫',
            'Are you a Supply Drop? Because you\'re exactly what I\'ve been waiting for 📦'
        ];

        const randomRizz = rizzLines[Math.floor(Math.random() * rizzLines.length)];

        const embed = new EmbedBuilder()
            .setColor('#e74c3c')
            .setTitle('😎 Rizz Line Suprema')
            .setDescription(`💬 *${randomRizz}*`)
            .setFooter({ text: 'BrainrotBot 🧠 | Úsala bajo tu propio riesgo' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
