const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('😂 Envía un meme aleatorio de Brainrot'),
    
    async execute(interaction) {
        const memes = [
            {
                title: 'Skibidi Toilet Apocalypse',
                image: 'https://i.imgflip.com/7xt9xy.jpg',
                caption: 'When the Skibidi Toilet takes over 💀'
            },
            {
                title: 'Sigma Male Grindset',
                image: 'https://i.imgflip.com/7xt9xy.jpg',
                caption: 'No time for relationships, only grinding 💪'
            },
            {
                title: 'Only in Ohio',
                image: 'https://i.imgflip.com/7xt9xy.jpg',
                caption: 'Ohio final boss be like: 🌽'
            },
            {
                title: 'Fanum Tax',
                image: 'https://i.imgflip.com/7xt9xy.jpg',
                caption: 'POV: Fanum taxes your food 🍕'
            },
            {
                title: 'Rizz God',
                image: 'https://i.imgflip.com/7xt9xy.jpg',
                caption: 'When you have infinite rizz 😎'
            },
            {
                title: 'Grimace Shake',
                image: 'https://i.imgflip.com/7xt9xy.jpg',
                caption: 'Never try the Grimace Shake 🟣💀'
            },
            {
                title: 'Goofy Ahh',
                image: 'https://i.imgflip.com/7xt9xy.jpg',
                caption: 'This goofy ahh moment 🤪'
            },
            {
                title: 'Fortnite Brainrot',
                image: 'https://i.imgflip.com/7xt9xy.jpg',
                caption: 'Playing Fortnite Creative at 3am 🎮'
            }
        ];

        const randomMeme = memes[Math.floor(Math.random() * memes.length)];

        const embed = new EmbedBuilder()
            .setColor('#9b59b6')
            .setTitle(`😂 ${randomMeme.title}`)
            .setDescription(randomMeme.caption)
            .setImage(randomMeme.image)
            .setFooter({ text: 'BrainrotBot 🧠 | /meme para más' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
