const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('🏓 Check bot latency'),
    
    async execute(interaction) {
        const sent = await interaction.reply({ content: '🏓 Calculating ping...', fetchReply: true });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        const apiLatency = Math.round(interaction.client.ws.ping);

        const embed = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle('🏓 Pong!')
            .setDescription('**Bot Latencies:**')
            .addFields(
                { name: '📡 Bot Latency', value: `\`${latency}ms\``, inline: true },
                { name: '💚 API Latency', value: `\`${apiLatency}ms\``, inline: true }
            )
            .setFooter({ text: 'BrainrotBot 🧠' })
            .setTimestamp();

        await interaction.editReply({ content: null, embeds: [embed] });
    },
};
