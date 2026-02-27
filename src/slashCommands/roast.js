const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roast')
        .setDescription('🔥 Receive a brainrot roast (or mention someone)')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to roast (optional)')
                .setRequired(false)),
    
    async execute(interaction) {
        const targetUser = interaction.options.getUser('user') || interaction.user;

        const roasts = [
            'you have less rizz than a Skyrim NPC 💀',
            'you\'re more goofy ahh than the videos you watch at 3am 🤪',
            'your grindset is weaker than your grandma\'s wifi 📡',
            'only in Ohio would you be considered cool 🌽',
            'you have the charisma of a Skibidi Toilet with no battery 🚽',
            'you\'re the type of person who thinks Grimace Shake is healthy 🟣',
            'your sigma level is -1000, pure beta 📉',
            'you have less game than a Fortnite tutorial 🎮',
            'you\'re more mid than Netflix movies 📺',
            'your vibe is as dead as 2010 memes ⚰️',
            'you put Fanum Tax on your own food 🍕',
            'your playstyle is more predictable than a bot 🤖',
            'you have the sense of humor of a potato 🥔',
            'you\'re the type who asks "who?" in Among Us 🎭',
            'your Fortnite build is slower than Internet Explorer 🐌'
        ];

        const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];

        const embed = new EmbedBuilder()
            .setColor('#e74c3c')
            .setTitle('🔥 ROAST BRAINROT ACTIVATED')
            .setDescription(`**${targetUser.username}**, ${randomRoast}`)
            .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: 'BrainrotBot 🧠 | Just kidding... or am I? 💀' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
