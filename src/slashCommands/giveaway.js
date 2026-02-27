const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('🎁 Create a giveaway on the server')
        .addStringOption(option =>
            option.setName('prize')
                .setDescription('What will be given away?')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('duration')
                .setDescription('Duration in minutes')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(10080))
        .addIntegerOption(option =>
            option.setName('winners')
                .setDescription('Number of winners')
                .setRequired(false)
                .setMinValue(1)
                .setMaxValue(20)),
    
    async execute(interaction) {
        const prize = interaction.options.getString('prize');
        const duration = interaction.options.getInteger('duration');
        const winners = interaction.options.getInteger('winners') || 1;

        const endTime = Date.now() + (duration * 60 * 1000);
        const endTimestamp = Math.floor(endTime / 1000);

        const embed = new EmbedBuilder()
            .setColor('#f1c40f')
            .setTitle('🎁 ACTIVE GIVEAWAY')
            .setDescription(`**Prize: ${prize}**\n\nReact with 🎉 to participate!`)
            .addFields(
                { name: '👥 Winners', value: winners.toString(), inline: true },
                { name: '⏰ Ends', value: `<t:${endTimestamp}:R>`, inline: true },
                { name: '🎯 Ends on', value: `<t:${endTimestamp}:F>`, inline: false },
                { name: '📢 Organized by', value: interaction.user.tag, inline: true }
            )
            .setFooter({ text: 'BrainrotBot 🧠 | Good luck!' })
            .setTimestamp();

        const message = await interaction.reply({ embeds: [embed], fetchReply: true });
        await message.react('🎉');

        // Schedule end of giveaway
        setTimeout(async () => {
            try {
                const fetchedMessage = await message.fetch();
                const reaction = fetchedMessage.reactions.cache.get('🎉');
                
                if (!reaction) {
                    const noReactionsEmbed = new EmbedBuilder()
                        .setColor('#e74c3c')
                        .setTitle('🎁 Giveaway Ended')
                        .setDescription(`**Prize: ${prize}**\n\n❌ There were no participants.`)
                        .setFooter({ text: 'BrainrotBot 🧠' })
                        .setTimestamp();
                    
                    return await interaction.editReply({ embeds: [noReactionsEmbed] });
                }

                const users = await reaction.users.fetch();
                const participants = users.filter(user => !user.bot);

                if (participants.size === 0) {
                    const noParticipantsEmbed = new EmbedBuilder()
                        .setColor('#e74c3c')
                        .setTitle('🎁 Giveaway Ended')
                        .setDescription(`**Prize: ${prize}**\n\n❌ There were no valid participants.`)
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
                    .setTitle('🎁 GIVEAWAY ENDED')
                    .setDescription(`**Prize: ${prize}**`)
                    .addFields(
                        { name: '🎉 Winner(s)', value: winnersList, inline: false },
                        { name: '👥 Participants', value: participants.size.toString(), inline: true }
                    )
                    .setFooter({ text: 'BrainrotBot 🧠 | Congratulations!' })
                    .setTimestamp();

                await interaction.editReply({ embeds: [winnerEmbed] });
                await interaction.followUp({ 
                    content: `🎉 **Congratulations ${winnersList}!** You won: **${prize}**`,
                    allowedMentions: { parse: ['users'] }
                });

            } catch (error) {
                console.error('Error ending giveaway:', error);
            }
        }, duration * 60 * 1000);
    },
};
