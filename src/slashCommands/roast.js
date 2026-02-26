const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roast')
        .setDescription('🔥 Recibe un roast brainrot (o menciona a alguien)')
        .addUserOption(option =>
            option.setName('usuario')
                .setDescription('Usuario a roastear (opcional)')
                .setRequired(false)),
    
    async execute(interaction) {
        const targetUser = interaction.options.getUser('usuario') || interaction.user;

        const roasts = [
            'tienes menos rizz que un NPC de Skyrim 💀',
            'eres más goofy ahh que los videos que miras a las 3am 🤪',
            'tu grindset es más débil que el wifi de tu abuela 📡',
            'solo en Ohio serías considerado cool 🌽',
            'tienes el carisma de un Skibidi Toilet sin batería 🚽',
            'eres el tipo de persona que piensa que Grimace Shake es saludable 🟣',
            'tu nivel de sigma es -1000, puro beta 📉',
            'tienes menos game que un tutorial de Fortnite 🎮',
            'eres más mid que las películas de Netflix 📺',
            'tu vibe es tan dead como los memes de 2010 ⚰️',
            'le pones Fanum Tax hasta a tu propia comida 🍕',
            'tu estilo de juego es más predecible que un bot 🤖',
            'tienes el sense of humor de una patata 🥔',
            'eres el tipo que pregunta "¿quién es?" en un Among Us 🎭',
            'tu build en Fortnite es más lento que Internet Explorer 🐌'
        ];

        const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];

        const embed = new EmbedBuilder()
            .setColor('#e74c3c')
            .setTitle('🔥 ROAST BRAINROT ACTIVATED')
            .setDescription(`**${targetUser.username}**, ${randomRoast}`)
            .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: 'BrainrotBot 🧠 | Es broma... o no? 💀' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
