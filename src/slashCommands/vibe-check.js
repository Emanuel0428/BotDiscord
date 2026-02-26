const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vibe-check')
        .setDescription('✨ Chequea tu vibe del día'),
    
    async execute(interaction) {
        const vibes = [
            { level: 'ULTRA SIGMA', percentage: 100, emoji: '🗿', color: '#000000', description: 'Grindset máximo, eres imparable hoy' },
            { level: 'BUSSIN FR FR', percentage: 95, emoji: '🔥', color: '#ff6b6b', description: 'Tu energía está en el tope' },
            { level: 'PEAK FICTION', percentage: 90, emoji: '👑', color: '#f1c40f', description: 'Estás en tu mejor momento' },
            { level: 'W ENERGY', percentage: 85, emoji: '💪', color: '#2ecc71', description: 'Solo sacas Ws hoy' },
            { level: 'BASED', percentage: 80, emoji: '😎', color: '#3498db', description: 'Vibes correctos, keep going' },
            { level: 'RIZZ GOD', percentage: 75, emoji: '✨', color: '#9b59b6', description: 'El carisma te sobra' },
            { level: 'DECENT GRIND', percentage: 70, emoji: '💼', color: '#95a5a6', description: 'Vas bien, sigue así' },
            { level: 'MID', percentage: 50, emoji: '😐', color: '#7f8c8d', description: 'Ni fu ni fa, un día normal' },
            { level: 'LOW ENERGY', percentage: 40, emoji: '😴', color: '#34495e', description: 'Recharge needed bro' },
            { level: 'L TAKE', percentage: 30, emoji: '👎', color: '#e67e22', description: 'Not your day, happens' },
            { level: 'NPC MODE', percentage: 20, emoji: '🤖', color: '#d35400', description: 'Estás en automático' },
            { level: 'OHIO VIBES', percentage: 10, emoji: '🌽', color: '#c0392b', description: 'Algo anda mal... muy mal' }
        ];

        // Selección "random" basada en el ID del usuario para consistencia diaria
        const today = new Date().toDateString();
        const seed = interaction.user.id + today;
        const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const vibeIndex = hash % vibes.length;
        const todayVibe = vibes[vibeIndex];

        const embed = new EmbedBuilder()
            .setColor(todayVibe.color)
            .setTitle('✨ VIBE CHECK DEL DÍA')
            .setDescription(`**${interaction.user.username}**, tu vibe de hoy es:`)
            .addFields(
                { name: `${todayVibe.emoji} Nivel de Vibe`, value: todayVibe.level, inline: true },
                { name: '📊 Porcentaje', value: `${todayVibe.percentage}%`, inline: true },
                { name: '💭 Descripción', value: todayVibe.description, inline: false }
            )
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: 'BrainrotBot 🧠 | Tu vibe cambia cada día' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
