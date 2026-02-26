const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('📊 Crea una encuesta en el servidor')
        .addStringOption(option =>
            option.setName('pregunta')
                .setDescription('La pregunta de la encuesta')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('opcion1')
                .setDescription('Primera opción')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('opcion2')
                .setDescription('Segunda opción')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('opcion3')
                .setDescription('Tercera opción (opcional)')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('opcion4')
                .setDescription('Cuarta opción (opcional)')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('opcion5')
                .setDescription('Quinta opción (opcional)')
                .setRequired(false)),
    
    async execute(interaction) {
        const question = interaction.options.getString('pregunta');
        const options = [
            interaction.options.getString('opcion1'),
            interaction.options.getString('opcion2'),
            interaction.options.getString('opcion3'),
            interaction.options.getString('opcion4'),
            interaction.options.getString('opcion5')
        ].filter(opt => opt !== null);

        const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];

        let description = '**Vota reaccionando abajo:**\n\n';
        options.forEach((option, index) => {
            description += `${emojis[index]} ${option}\n`;
        });

        const embed = new EmbedBuilder()
            .setColor('#9b59b6')
            .setTitle('📊 ENCUESTA')
            .setDescription(description)
            .addFields(
                { name: '❓ Pregunta', value: question, inline: false },
                { name: '📢 Creado por', value: interaction.user.tag, inline: true },
                { name: '🗳️ Opciones', value: options.length.toString(), inline: true }
            )
            .setFooter({ text: 'BrainrotBot 🧠 | Vota reaccionando' })
            .setTimestamp();

        const message = await interaction.reply({ embeds: [embed], fetchReply: true });

        // Agregar reacciones para cada opción
        for (let i = 0; i < options.length; i++) {
            await message.react(emojis[i]);
        }
    },
};
