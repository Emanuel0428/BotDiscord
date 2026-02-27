const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('ℹ️ Information about the server and bot'),
    
    async execute(interaction) {
        const guild = interaction.guild;
        
        const embed = new EmbedBuilder()
            .setColor('#3498db')
            .setTitle('ℹ️ Server Information')
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: '🎮 Server', value: guild.name, inline: true },
                { name: '👥 Members', value: `${guild.memberCount}`, inline: true },
                { name: '📅 Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
                { name: '🧠 Bot', value: 'BrainrotBot v1.0', inline: true },
                { name: '🗺️ Theme', value: 'Fortnite Creative Brainrot', inline: true },
                { name: '💻 Developed with', value: 'Discord.js', inline: true }
            )
            .setDescription('*Server dedicated to Fortnite Creative maps with Brainrot theme* 💀')
            .setFooter({ text: `Server ID: ${guild.id}` })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
