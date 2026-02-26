const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('ℹ️ Información sobre el servidor y el bot'),
    
    async execute(interaction) {
        const guild = interaction.guild;
        
        const embed = new EmbedBuilder()
            .setColor('#3498db')
            .setTitle('ℹ️ Información del Servidor')
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addFields(
                { name: '🎮 Servidor', value: guild.name, inline: true },
                { name: '👥 Miembros', value: `${guild.memberCount}`, inline: true },
                { name: '📅 Creado', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
                { name: '🧠 Bot', value: 'BrainrotBot v1.0', inline: true },
                { name: '🗺️ Temática', value: 'Fortnite Creative Brainrot', inline: true },
                { name: '💻 Desarrollado con', value: 'Discord.js', inline: true }
            )
            .setDescription('*Servidor dedicado a mapas de Fortnite Creative con temática Brainrot* 💀')
            .setFooter({ text: `ID del Servidor: ${guild.id}` })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
