const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ship')
        .setDescription('💕 Calculate compatibility between two people')
        .addUserOption(option =>
            option.setName('persona1')
                .setDescription('First person')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('persona2')
                .setDescription('Second person')
                .setRequired(true)),
    
    async execute(interaction) {
        const user1 = interaction.options.getUser('persona1');
        const user2 = interaction.options.getUser('persona2');

        // Calculate "random" but consistent compatibility
        const seed = [user1.id, user2.id].sort().join('');
        const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const compatibility = hash % 101;

        let status, emoji, message;

        if (compatibility >= 90) {
            status = 'PERFECT MATCH';
            emoji = '💖';
            message = 'Perfect match! This is peak fiction fr fr 🔥';
        } else if (compatibility >= 75) {
            status = 'BUSSIN';
            emoji = '❤️';
            message = 'Compatible! The rizz is present 😎';
        } else if (compatibility >= 60) {
            status = 'GOOD VIBES';
            emoji = '💕';
            message = 'Looking good, they have chemistry 💫';
        } else if (compatibility >= 45) {
            status = 'MID';
            emoji = '💛';
            message = 'It\'s fine, but nothing special 😐';
        } else if (compatibility >= 30) {
            status = 'NOT BUSSIN';
            emoji = '💔';
            message = 'Mmm... better as friends 🤷';
        } else if (compatibility >= 15) {
            status = 'L MATCH';
            emoji = '😬';
            message = 'Houston, we have a problem 🚫';
        } else {
            status = 'TOXIC';
            emoji = '💀';
            message = 'Run. Just run. Ohio level chemistry 🌽';
        }

        // Create visual progress bar
        const filled = Math.floor(compatibility / 10);
        const empty = 10 - filled;
        const progressBar = '█'.repeat(filled) + '░'.repeat(empty);

        const embed = new EmbedBuilder()
            .setColor('#e91e63')
            .setTitle(`${emoji} SHIP CALCULATOR ${emoji}`)
            .setDescription(`**${user1.username}** 💕 **${user2.username}**`)
            .addFields(
                { name: '💝 Compatibility', value: `${progressBar} ${compatibility}%`, inline: false },
                { name: '📊 Status', value: status, inline: true },
                { name: '💭 Verdict', value: message, inline: false }
            )
            .setFooter({ text: 'BrainrotBot 🧠 | Ship responsibly' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
