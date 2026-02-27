const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus, entersState } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sound')
        .setDescription('🔊 Play an epic Brainrot sound in your voice channel')
        .addStringOption(option =>
            option.setName('sonido')
                .setDescription('Choose a specific sound (optional)')
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
        // Verify that the user is in a voice channel
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return await interaction.reply({
                content: '❌ You must be in a voice channel to use this command!',
                flags: MessageFlags.Ephemeral
            });
        }

        // List of sounds with direct URLs from myinstants
        const sounds = {
            rizz: {
                name: 'Rizz Sound Effect',
                url: 'https://www.myinstants.com/media/sounds/rizz-sound-effect.mp3',
                emoji: '🗣️',
                description: 'The supreme rizz sound'
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
                description: 'Sigma grindset activated'
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
                description: 'Bruh moment'
            },
            boom: {
                name: 'Vine Boom',
                url: 'https://www.myinstants.com/media/sounds/vine-boom.mp3',
                emoji: '🌽',
                description: 'The legendary boom'
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
                description: 'Evil laugh'
            }
        };

        // Select sound (specific or random)
        const selectedChoice = interaction.options.getString('sonido');
        const soundKeys = Object.keys(sounds);
        const soundKey = selectedChoice || soundKeys[Math.floor(Math.random() * soundKeys.length)];
        const selectedSound = sounds[soundKey];

        await interaction.deferReply();

        try {
            // Connect to voice channel
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
                selfDeaf: false,
                selfMute: false,
            });

            // Wait for connection to be ready
            await entersState(connection, VoiceConnectionStatus.Ready, 30_000);

            // Create audio resource
            const resource = createAudioResource(selectedSound.url);
            const player = createAudioPlayer();

            // Play the audio
            player.play(resource);
            connection.subscribe(player);

            // Respond to user
            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle(`${selectedSound.emoji} Reproduciendo: ${selectedSound.name}`)
                .setDescription(`**${selectedSound.description}**\n\n🔊 Sonando en: ${voiceChannel.name}`)
                .setFooter({ text: 'BrainrotBot 🧠 | Bot will disconnect automatically' })
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });

            // Disconnect when audio finishes
            player.on(AudioPlayerStatus.Idle, () => {
                connection.destroy();
            });

            // Safety timeout (30 seconds)
            setTimeout(() => {
                if (connection.state.status !== VoiceConnectionStatus.Destroyed) {
                    connection.destroy();
                }
            }, 30000);

        } catch (error) {
            console.error('Error playing sound:', error);
            await interaction.editReply({
                content: '❌ There was an error playing the sound. Make sure the bot has permissions to join the voice channel.',
                embeds: []
            });
        }
    },
};
