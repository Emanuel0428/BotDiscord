const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ohio')
        .setDescription('🌽 Only in Ohio... where the craziest things happen'),
    
    async execute(interaction) {
        const ohioEvents = [
            'A Skibidi Toilet appeared at the supermarket 🚽',
            'I saw Grimace chasing people with his shake 🟣💀',
            'The traffic lights started dancing to phonk music 🚦',
            'My neighbor turned into a sigma male out of nowhere 💪',
            'The cows are making TikToks in the field 🐄📱',
            'The sun became square like in Minecraft ☀️',
            'McDonald\'s are flying through the sky 🍔✈️',
            'I saw a tornado made of Pizza from the Fanum Tax 🌪️🍕',
            'The memes came to life and are walking down the street 💀',
            'My car started playing goofy ahh sounds on its own 🚗🎵',
            'The mayor declared brainrot as an official sport 🏆',
            'The clouds are shaped like emojis 💀 ☁️',
            'The dogs are speaking Zoomer language 🐕',
            'Tap water came out tasting like Mountain Dew 💚',
            'I saw a portal to the Skibidi dimension in my backyard 🌀'
        ];

        const randomEvent = ohioEvents[Math.floor(Math.random() * ohioEvents.length)];

        const embed = new EmbedBuilder()
            .setColor('#FFA500')
            .setTitle('🌽 ONLY IN OHIO')
            .setDescription(`**${randomEvent}**\n\n*Only in Ohio can these random things happen* 💀`)
            .setFooter({ text: 'BrainrotBot 🧠 | Based on a true story (maybe)' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
