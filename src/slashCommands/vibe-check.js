const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vibe-check')
        .setDescription('✨ Check your vibe of the day'),
    
    async execute(interaction) {
        const vibes = [
            { level: 'ULTRA SIGMA', percentage: 100, emoji: '🗿', color: '#000000', description: 'Maximum grindset, you\'re unstoppable today' },
            { level: 'BUSSIN FR FR', percentage: 95, emoji: '🔥', color: '#ff6b6b', description: 'Your energy is at the top' },
            { level: 'PEAK FICTION', percentage: 90, emoji: '👑', color: '#f1c40f', description: 'You\'re at your best moment' },
            { level: 'W ENERGY', percentage: 85, emoji: '💪', color: '#2ecc71', description: 'Only Ws today' },
            { level: 'BASED', percentage: 80, emoji: '😎', color: '#3498db', description: 'Correct vibes, keep going' },
            { level: 'RIZZ GOD', percentage: 75, emoji: '✨', color: '#9b59b6', description: 'Charisma overload' },
            { level: 'DECENT GRIND', percentage: 70, emoji: '💼', color: '#95a5a6', description: 'You\'re doing well, keep it up' },
            { level: 'MID', percentage: 50, emoji: '😐', color: '#7f8c8d', description: 'Meh, a normal day' },
            { level: 'LOW ENERGY', percentage: 40, emoji: '😴', color: '#34495e', description: 'Recharge needed bro' },
            { level: 'L TAKE', percentage: 30, emoji: '👎', color: '#e67e22', description: 'Not your day, happens' },
            { level: 'NPC MODE', percentage: 20, emoji: '🤖', color: '#d35400', description: 'You\'re on autopilot' },
            { level: 'OHIO VIBES', percentage: 10, emoji: '🌽', color: '#c0392b', description: 'Something\'s wrong... very wrong' }
        ];

        // "Random" selection based on user ID for daily consistency
        const today = new Date().toDateString();
        const seed = interaction.user.id + today;
        const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const vibeIndex = hash % vibes.length;
        const todayVibe = vibes[vibeIndex];

        const embed = new EmbedBuilder()
            .setColor(todayVibe.color)
            .setTitle('✨ VIBE CHECK OF THE DAY')
            .setDescription(`**${interaction.user.username}**, your vibe today is:`)
            .addFields(
                { name: `${todayVibe.emoji} Vibe Level`, value: todayVibe.level, inline: true },
                { name: '📊 Percentage', value: `${todayVibe.percentage}%`, inline: true },
                { name: '💭 Description', value: todayVibe.description, inline: false }
            )
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: 'BrainrotBot 🧠 | Your vibe changes every day' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
