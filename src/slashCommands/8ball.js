const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('🔮 Pregúntale algo a la bola mágica brainrot')
        .addStringOption(option =>
            option.setName('pregunta')
                .setDescription('Tu pregunta')
                .setRequired(true)),
    
    async execute(interaction) {
        const question = interaction.options.getString('pregunta');

        const responses = [
            // Respuestas positivas
            'Sí, 100% seguro on god fr fr 💯',
            'No hay duda, eso es bussin 🔥',
            'Las señales apuntan a un rotundo sí 🎯',
            'Claro que sí mi pana, skibidi approved ✅',
            'Yo creo que sí, sigma energy detected 💪',
            'Por supuesto, W take hermano 🏆',
            'Yes yes yes, skibidi dop dop 🚽',
            'Obvio que sí, based y redpilled 📕',
            // Respuestas negativas
            'Nah, eso es un L take 👎',
            'No lo veo claro, mid energy 😐',
            'Mejor no, eso no es bussin 🚫',
            'Nop, ese cap es muy fuerte 🧢',
            'No creo, solo en Ohio pasaría eso 🌽',
            'Negativo soldado, beta move 📉',
            'Eso es un no, goofy ahh question 🤪',
            'Mejor olvídalo, NPC behavior 💀',
            // Respuestas neutrales
            'Pregunta de nuevo más tarde, estoy en mi grind 💼',
            'No estoy seguro, consulta con el rizz council 🤔',
            'La respuesta no está clara, muy sigma para decidir 🌫️',
            'Concentrate y pregunta de nuevo, skibidi confusion 🔄',
            'Es un 50/50 bro, sácalo en Fortnite 🎲',
            'Depende de tu mindset, sigma o beta? 🤷'
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        const embed = new EmbedBuilder()
            .setColor('#9b59b6')
            .setTitle('🔮 La Bola Mágica Brainrot Dice...')
            .addFields(
                { name: '❓ Tu Pregunta', value: question, inline: false },
                { name: '💭 Respuesta', value: randomResponse, inline: false }
            )
            .setFooter({ text: 'BrainrotBot 🧠 | 100% accurate (maybe)' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
