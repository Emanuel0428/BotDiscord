const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ship')
        .setDescription('💕 Calcula la compatibilidad entre dos personas')
        .addUserOption(option =>
            option.setName('persona1')
                .setDescription('Primera persona')
                .setRequired(true))
        .addUserOption(option =>
            option.setName('persona2')
                .setDescription('Segunda persona')
                .setRequired(true)),
    
    async execute(interaction) {
        const user1 = interaction.options.getUser('persona1');
        const user2 = interaction.options.getUser('persona2');

        // Calcular compatibilidad "aleatoria" pero consistente
        const seed = [user1.id, user2.id].sort().join('');
        const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const compatibility = hash % 101;

        let status, emoji, message;

        if (compatibility >= 90) {
            status = 'PERFECT MATCH';
            emoji = '💖';
            message = 'Match perfecto! Esto es peak fiction fr fr 🔥';
        } else if (compatibility >= 75) {
            status = 'BUSSIN';
            emoji = '❤️';
            message = 'Compatible! El rizz está presente 😎';
        } else if (compatibility >= 60) {
            status = 'GOOD VIBES';
            emoji = '💕';
            message = 'Está bonito, tienen chemistry 💫';
        } else if (compatibility >= 45) {
            status = 'MID';
            emoji = '💛';
            message = 'Está bien, pero nada del otro mundo 😐';
        } else if (compatibility >= 30) {
            status = 'NOT BUSSIN';
            emoji = '💔';
            message = 'Mmm... mejor como amigos 🤷';
        } else if (compatibility >= 15) {
            status = 'L MATCH';
            emoji = '😬';
            message = 'Houston, tenemos un problema 🚫';
        } else {
            status = 'TOXIC';
            emoji = '💀';
            message = 'Run. Solo huye. Ohio level chemistry 🌽';
        }

        // Crear barra de progreso visual
        const filled = Math.floor(compatibility / 10);
        const empty = 10 - filled;
        const progressBar = '█'.repeat(filled) + '░'.repeat(empty);

        const embed = new EmbedBuilder()
            .setColor('#e91e63')
            .setTitle(`${emoji} SHIP CALCULATOR ${emoji}`)
            .setDescription(`**${user1.username}** 💕 **${user2.username}**`)
            .addFields(
                { name: '💝 Compatibilidad', value: `${progressBar} ${compatibility}%`, inline: false },
                { name: '📊 Status', value: status, inline: true },
                { name: '💭 Veredicto', value: message, inline: false }
            )
            .setFooter({ text: 'BrainrotBot 🧠 | Ship responsablemente' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
