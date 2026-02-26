const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus, entersState } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sound')
        .setDescription('🔊 Reproduce un sonido épico de Brainrot en tu canal de voz')
        .addStringOption(option =>
            option.setName('sonido')
                .setDescription('Elige un sonido específico (opcional)')
                .setRequired(false)
                .addChoices(
                    { name: '🗣️ Rizz', value: 'rizz' },
                    { name: '🚽 Skibidi Toilet', value: 'skibidi' },
                    { name: '💪 Sigma', value: 'sigma' },
                    { name: '🔧 Metal Pipe', value: 'pipe' },
                    { name: '💀 Bruh', value: 'bruh' },
                    { name: '🌽 Vine Boom', value: 'boom' },
                    { name: '🔔 Bell', value: 'bell' },
                    { name: '😂 Laugh', value: 'laugh' }
                )),
    
    async execute(interaction) {
        // Verificar que el usuario esté en un canal de voz
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return await interaction.reply({
                content: '❌ ¡Debes estar en un canal de voz para usar este comando!',
                flags: MessageFlags.Ephemeral
            });
        }

        // Lista de sonidos con URLs directas de myinstants
        const sounds = {
            rizz: {
                name: 'Rizz Sound Effect',
                url: 'https://www.myinstants.com/media/sounds/rizz-sound-effect.mp3',
                emoji: '🗣️',
                description: 'El sonido supremo del rizz'
            },
            skibidi: {
                name: 'Skibidi Toilet',
                url: 'https://www.myinstants.com/media/sounds/skibidi-toilet-song.mp3',
                emoji: '🚽',
                description: 'Skibidi dop dop yes yes'
            },
            sigma: {
                name: 'Sigma Male',
                url: 'https://www.myinstants.com/media/sounds/sigma-male-grindset.mp3',
                emoji: '💪',
                description: 'Sigma grindset activado'
            },
            pipe: {
                name: 'Metal Pipe',
                url: 'https://www.myinstants.com/media/sounds/metal-pipe-sound.mp3',
                emoji: '🔧',
                description: 'BONK! 💀'
            },
            bruh: {
                name: 'Bruh Sound',
                url: 'https://www.myinstants.com/media/sounds/bruh-sound-effect.mp3',
                emoji: '💀',
                description: 'Bruh momento'
            },
            boom: {
                name: 'Vine Boom',
                url: 'https://www.myinstants.com/media/sounds/vine-boom.mp3',
                emoji: '🌽',
                description: 'El boom legendario'
            },
            bell: {
                name: 'Taco Bell',
                url: 'https://www.myinstants.com/media/sounds/taco-bell-bong-sfx.mp3',
                emoji: '🔔',
                description: 'Taco Bell dong'
            },
            laugh: {
                name: 'Evil Laugh',
                url: 'https://www.myinstants.com/media/sounds/evil-laugh.mp3',
                emoji: '😂',
                description: 'Risa maléfica'
            }
        };

        // Seleccionar sonido (específico o aleatorio)
        const selectedChoice = interaction.options.getString('sonido');
        const soundKeys = Object.keys(sounds);
        const soundKey = selectedChoice || soundKeys[Math.floor(Math.random() * soundKeys.length)];
        const selectedSound = sounds[soundKey];

        await interaction.deferReply();

        try {
            // Conectar al canal de voz
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
                selfDeaf: false,
                selfMute: false,
            });

            // Esperar a que la conexión esté lista
            await entersState(connection, VoiceConnectionStatus.Ready, 30_000);

            // Crear el recurso de audio
            const resource = createAudioResource(selectedSound.url);
            const player = createAudioPlayer();

            // Reproducir el audio
            player.play(resource);
            connection.subscribe(player);

            // Responder al usuario
            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle(`${selectedSound.emoji} Reproduciendo: ${selectedSound.name}`)
                .setDescription(`**${selectedSound.description}**\n\n🔊 Sonando en: ${voiceChannel.name}`)
                .setFooter({ text: 'BrainrotBot 🧠 | El bot se desconectará automáticamente' })
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });

            // Desconectar cuando termine el audio
            player.on(AudioPlayerStatus.Idle, () => {
                connection.destroy();
            });

            // Timeout de seguridad (30 segundos)
            setTimeout(() => {
                if (connection.state.status !== VoiceConnectionStatus.Destroyed) {
                    connection.destroy();
                }
            }, 30000);

        } catch (error) {
            console.error('Error reproduciendo sonido:', error);
            await interaction.editReply({
                content: '❌ Hubo un error al reproducir el sonido. Asegúrate de que el bot tenga permisos para unirse al canal de voz.',
                embeds: []
            });
        }
    },
};
