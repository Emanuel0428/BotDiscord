const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('🏓 Verifica la latencia del bot'),
    
    async execute(interaction) {
        const sent = await interaction.reply({ content: '🏓 Calculando ping...', fetchReply: true });
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        const apiLatency = Math.round(interaction.client.ws.ping);

        const embed = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle('🏓 Pong!')
            .setDescription('**Latencias del Bot:**')
            .addFields(
                { name: '📡 Latencia del Bot', value: `\`${latency}ms\``, inline: true },
                { name: '💚 Latencia de la API', value: `\`${apiLatency}ms\``, inline: true }
            )
            .setFooter({ text: 'BrainrotBot 🧠' })
            .setTimestamp();

        await interaction.editReply({ content: null, embeds: [embed] });
    },
};
