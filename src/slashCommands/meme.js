const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('😂 Send a random Brainrot meme'),
    
    async execute(interaction) {
        await interaction.deferReply();

        try {
            // Subreddits de brainrot y shitpost
            const subreddits = ['shitposting', 'GenZMemes', 'brainrot', 'comedyheaven', 'okbuddyretard', 'whenthe'];
            const randomSubreddit = subreddits[Math.floor(Math.random() * subreddits.length)];

            // Fetch meme from Reddit API
            const response = await fetch(`https://meme-api.com/gimme/${randomSubreddit}`);
            const memeData = await response.json();

            // Si el meme es NSFW, buscar otro
            if (memeData.nsfw) {
                const retry = await fetch(`https://meme-api.com/gimme/${randomSubreddit}`);
                const retryData = await retry.json();
                if (!retryData.nsfw) {
                    memeData.title = retryData.title;
                    memeData.url = retryData.url;
                    memeData.postLink = retryData.postLink;
                }
            }

            const brainrotEmojis = ['💀', '🧠', '🚽', '💪', '😤', '🗿', '🔥', '😎', '👀', '💯'];
            const randomEmoji = brainrotEmojis[Math.floor(Math.random() * brainrotEmojis.length)];

            const embed = new EmbedBuilder()
                .setColor('#9b59b6')
                .setTitle(`${randomEmoji} ${memeData.title}`)
                .setImage(memeData.url)
                .setFooter({ text: `BrainrotBot 🧠 | r/${randomSubreddit}` })
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Error fetching meme:', error);
            await interaction.editReply({
                content: '💀 Bruh the meme servers are down, try again fr fr',
                ephemeral: true
            });
        }
    },
};
