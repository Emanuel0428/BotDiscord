const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('🎁 Crea un sorteo en el servidor')
        .addStringOption(option =>
            option.setName('premio')
                .setDescription('¿Qué se va a sortear?')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('duracion')
                .setDescription('Duración en minutos')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(10080))
        .addIntegerOption(option =>
            option.setName('ganadores')
                .setDescription('Número de ganadores')
                .setRequired(false)
                .setMinValue(1)
                .setMaxValue(20)),
    
    async execute(interaction) {
        const prize = interaction.options.getString('premio');
        const duration = interaction.options.getInteger('duracion');
        const winners = interaction.options.getInteger('ganadores') || 1;

        const endTime = Date.now() + (duration * 60 * 1000);
        const endTimestamp = Math.floor(endTime / 1000);

        const embed = new EmbedBuilder()
            .setColor('#f1c40f')
            .setTitle('🎁 SORTEO ACTIVO')
            .setDescription(`**Premio: ${prize}**\n\n¡Reacciona con 🎉 para participar!`)
            .addFields(
                { name: '👥 Ganadores', value: winners.toString(), inline: true },
                { name: '⏰ Termina', value: `<t:${endTimestamp}:R>`, inline: true },
                { name: '🎯 Finaliza el', value: `<t:${endTimestamp}:F>`, inline: false },
                { name: '📢 Organizado por', value: interaction.user.tag, inline: true }
            )
            .setFooter({ text: 'BrainrotBot 🧠 | Buena suerte!' })
            .setTimestamp();

        const message = await interaction.reply({ embeds: [embed], fetchReply: true });
        await message.react('🎉');

        // Programar el fin del sorteo
        setTimeout(async () => {
            try {
                const fetchedMessage = await message.fetch();
                const reaction = fetchedMessage.reactions.cache.get('🎉');
                
                if (!reaction) {
                    const noReactionsEmbed = new EmbedBuilder()
                        .setColor('#e74c3c')
                        .setTitle('🎁 Sorteo Finalizado')
                        .setDescription(`**Premio: ${prize}**\n\n❌ No hubo participantes.`)
                        .setFooter({ text: 'BrainrotBot 🧠' })
                        .setTimestamp();
                    
                    return await interaction.editReply({ embeds: [noReactionsEmbed] });
                }

                const users = await reaction.users.fetch();
                const participants = users.filter(user => !user.bot);

                if (participants.size === 0) {
                    const noParticipantsEmbed = new EmbedBuilder()
                        .setColor('#e74c3c')
                        .setTitle('🎁 Sorteo Finalizado')
                        .setDescription(`**Premio: ${prize}**\n\n❌ No hubo participantes válidos.`)
                        .setFooter({ text: 'BrainrotBot 🧠' })
                        .setTimestamp();
                    
                    return await interaction.editReply({ embeds: [noParticipantsEmbed] });
                }

                const winnersArray = participants.random(Math.min(winners, participants.size));
                const winnersList = Array.isArray(winnersArray) 
                    ? winnersArray.map(user => user.toString()).join('\n')
                    : winnersArray.toString();

                const winnerEmbed = new EmbedBuilder()
                    .setColor('#00ff00')
                    .setTitle('🎁 SORTEO FINALIZADO')
                    .setDescription(`**Premio: ${prize}**`)
                    .addFields(
                        { name: '🎉 Ganador(es)', value: winnersList, inline: false },
                        { name: '👥 Participantes', value: participants.size.toString(), inline: true }
                    )
                    .setFooter({ text: 'BrainrotBot 🧠 | Felicidades!' })
                    .setTimestamp();

                await interaction.editReply({ embeds: [winnerEmbed] });
                await interaction.followUp({ 
                    content: `🎉 **Felicidades ${winnersList}!** Has ganado: **${prize}**`,
                    allowedMentions: { parse: ['users'] }
                });

            } catch (error) {
                console.error('Error al finalizar el sorteo:', error);
            }
        }, duration * 60 * 1000);
    },
};
