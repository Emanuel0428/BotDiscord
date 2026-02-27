const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('💬 Legendary Brainrot quotes'),
    
    async execute(interaction) {
        const quotes = [
            { text: 'Skibidi toilet? More like skibidi DRIP 💀', author: 'Gen Alpha Legend' },
            { text: 'You got no rizz, no gyatt, no nothing fr fr', author: 'Rizz Master' },
            { text: 'Only in Ohio bruh, only in Ohio...', author: 'Ohio Survivor' },
            { text: 'That\'s a sigma male grindset right there 💪', author: 'Sigma Philosophy' },
            { text: 'Bro got that Fanum Tax on everything 🍕', author: 'Fanum' },
            { text: 'Stop the cap, that\'s bussin fr fr no cap', author: 'Based Individual' },
            { text: 'Living that grimace shake lifestyle 🟣', author: 'Purple Guy' },
            { text: 'Goofy ahh sounds playing in my head 24/7', author: 'Brainrot Victim' },
            { text: 'My brain is cooked, I\'m all brainrot now 💀', author: 'True Brainrot' },
            { text: 'Nah bro, this is peak fiction', author: 'Peak Enjoyer' },
            { text: 'Chat, is this real? 🗣️', author: 'Streamer Moment' },
            { text: 'This is not a drill. Code red. Someone touched grass.', author: 'Discord Mod' },
            { text: 'Fortnite Creative maps hit different at 3am', author: 'Night Gamer' },
            { text: 'You just got ratio\'d + L + no bitches', author: 'Twitter User' },
            { text: 'This goes hard, feel free to screenshot', author: 'NFT Bro' }
        ];

        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        const embed = new EmbedBuilder()
            .setColor('#f39c12')
            .setTitle('💬 Brainrot Quote of the Day')
            .setDescription(`*"${randomQuote.text}"*`)
            .addFields({ name: '📝 Author', value: randomQuote.author })
            .setFooter({ text: 'BrainrotBot 🧠 | Supreme wisdom' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
