const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-server')
        .setDescription('🛠️ Organize server channels with categories and rules')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        try {
            const guild = interaction.guild;

            // Server structure to create
            const serverStructure = [
                {
                    name: '📋 INFORMATION',
                    type: ChannelType.GuildCategory,
                    channels: [
                        { name: '📜・rules', type: ChannelType.GuildText, description: 'Server rules' },
                        { name: '📢・announcements', type: ChannelType.GuildText, description: 'Important announcements' },
                        { name: '🎉・welcome', type: ChannelType.GuildText, description: 'Welcome new members' }
                    ]
                },
                {
                    name: '💬 GENERAL CHAT',
                    type: ChannelType.GuildCategory,
                    channels: [
                        { name: '🧠・brainrot-chat', type: ChannelType.GuildText, description: 'General brainrot chat' },
                        { name: '🎮・gaming', type: ChannelType.GuildText, description: 'Talk about games' },
                        { name: '🎨・media', type: ChannelType.GuildText, description: 'Memes, videos, images' },
                        { name: '🤖・bot-commands', type: ChannelType.GuildText, description: 'Use bot commands here' }
                    ]
                },
                {
                    name: '🎮 FORTNITE',
                    type: ChannelType.GuildCategory,
                    channels: [
                        { name: '🗺️・maps', type: ChannelType.GuildText, description: 'Map codes and voting' },
                        { name: '🏆・leaderboard', type: ChannelType.GuildText, description: 'Rankings and statistics' },
                        { name: '🎤・voice-chat', type: ChannelType.GuildVoice, description: 'General voice chat' }
                    ]
                }
            ];

            let createdChannels = [];

            // Create the structure
            for (const category of serverStructure) {
                // Check if category already exists
                let categoryChannel = guild.channels.cache.find(
                    c => c.name === category.name && c.type === ChannelType.GuildCategory
                );

                // If it doesn't exist, create it
                if (!categoryChannel) {
                    categoryChannel = await guild.channels.create({
                        name: category.name,
                        type: ChannelType.GuildCategory
                    });
                    createdChannels.push(category.name);
                }

                // Create channels within the category
                for (const channel of category.channels) {
                    let existingChannel = guild.channels.cache.find(
                        c => c.name === channel.name && c.parentId === categoryChannel.id
                    );

                    if (!existingChannel) {
                        const newChannel = await guild.channels.create({
                            name: channel.name,
                            type: channel.type,
                            parent: categoryChannel.id,
                            topic: channel.description
                        });
                        createdChannels.push(channel.name);

                        // Send initial content based on channel
                        if (channel.name === '📜・rules') {
                            await sendRules(newChannel);
                        } else if (channel.name === '📢・announcements') {
                            await sendAnnouncements(newChannel, guild);
                        } else if (channel.name === '🎉・welcome') {
                            await sendWelcomeInfo(newChannel);
                        } else if (channel.name === '🤖・bot-commands') {
                            await sendBotCommandsInfo(newChannel);
                        } else if (channel.name === '🗺️・maps') {
                            await sendMapsInfo(newChannel);
                        } else if (channel.name === '🧠・brainrot-chat') {
                            await sendGeneralChatWelcome(newChannel);
                        }
                    }
                }
            }

            // Response to user
            const embed = new EmbedBuilder()
                .setColor('#00ff00')
                .setTitle('✅ Server Organized')
                .setDescription(`Server structure has been configured successfully.`)
                .addFields(
                    { name: '📊 Categories Created', value: serverStructure.map(c => c.name).join('\n'), inline: true },
                    { name: '🆕 New Elements', value: createdChannels.length > 0 ? `${createdChannels.length} channels/categories` : 'None (already existed)', inline: true }
                )
                .setFooter({ text: '💀 Brainrot Server configured successfully' })
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('Error in setup-server:', error);
            await interaction.editReply({ 
                content: '❌ There was an error organizing the server. Make sure the bot has Administrator permissions.',
                ephemeral: true 
            });
        }
    }
};

async function sendRules(channel) {
    const rulesEmbed = new EmbedBuilder()
        .setColor('#ff0000')
        .setTitle('📜 SERVER RULES - DON\'T BE CRINGE 💀')
        .setDescription('Welcome to the most sigma server on Discord. Follow these rules or we\'ll ban you to the shadow realm fr fr no cap 🧢')
        .addFields(
            { 
                name: '1️⃣ Respect everyone (even the NPCs)', 
                value: '> No unnecessary toxicity. We can troll but don\'t be too edgy. Keep it bussin\' 🤝',
                inline: false 
            },
            { 
                name: '2️⃣ No spam (that\'s very mid)', 
                value: '> No floods, no command spam, no raids. If you spam we\'ll mute you faster than a fanum tax 💸',
                inline: false 
            },
            { 
                name: '3️⃣ Appropriate content only', 
                value: '> NSFW, gore, illegal content or anything that violates Discord ToS is prohibited. Keep the vibe clean 🧼',
                inline: false 
            },
            { 
                name: '4️⃣ No promotion without permission', 
                value: '> No invites to other servers or self-promo. If you want to promote something, ask the admins first 🚫',
                inline: false 
            },
            { 
                name: '5️⃣ Use the right channels gyat', 
                value: '> Every channel has its purpose. Read the descriptions and use them correctly. Bot commands in <#bot-commands> fr 🤖',
                inline: false 
            },
            { 
                name: '6️⃣ Decent names and avatars', 
                value: '> No unpronounceable, offensive names or NSFW avatars. Admins can change them if necessary 👤',
                inline: false 
            },
            { 
                name: '7️⃣ Respect Discord ToS', 
                value: '> All Discord rules apply here. If you break ToS = instant ban. Don\'t be goofy 📋',
                inline: false 
            },
            { 
                name: '8️⃣ Trust in the mods (they\'re the alpha)', 
                value: '> If a moderator asks you something, do it. They have the final word. Don\'t argue in public, use DMs 🛡️',
                inline: false 
            }
        )
        .addFields({
            name: '⚠️ CONSEQUENCES',
            value: '```\n' +
                   '1st time: Verbal warning (chill bro)\n' +
                   '2nd time: Temporary timeout/mute (L moment)\n' +
                   '3rd time: Kick from server (ratio)\n' +
                   '4th time or serious infraction: Permanent BAN (get rekt)\n' +
                   '```',
            inline: false
        })
        .setFooter({ text: '💀 By staying on the server you accept these rules | Stay sigma kings 👑' })
        .setTimestamp();

    await channel.send({ embeds: [rulesEmbed] });
    await channel.send('**React with ✅ if you read and accept the rules (if you don\'t you\'re an NPC fr)**');
}

async function sendAnnouncements(channel, guild) {
    const embed = new EmbedBuilder()
        .setColor('#ffd700')
        .setTitle('🎉 WELCOME TO THE BRAINROT SERVER')
        .setDescription(`Welcome to **${guild.name}**, the most sigma server for Fortnite Creative maps! 💀`)
        .addFields(
            { 
                name: '📜 Read the Rules', 
                value: 'Check #rules to see server rules and avoid getting banned fr', 
                inline: false 
            },
            { 
                name: '🗺️ Submit Maps', 
                value: 'Use `/submit-map` to share your Fortnite Creative codes', 
                inline: false 
            },
            { 
                name: '🤖 Bot Commands', 
                value: 'Type `/help` to see all available commands', 
                inline: false 
            },
            { 
                name: '💬 Have Fun!', 
                value: 'Join the conversation, vote for maps, and enjoy the brainrot vibes no cap 🧠', 
                inline: false 
            }
        )
        .setFooter({ text: '💀 Stay sigma kings 👑' })
        .setTimestamp();

    await channel.send({ embeds: [embed] });
    await channel.send('🔔 **This channel is for important announcements only. Stay tuned for updates!**');
}

async function sendWelcomeInfo(channel) {
    const embed = new EmbedBuilder()
        .setColor('#00ff88')
        .setTitle('👋 WELCOME TO THE SERVER!')
        .setDescription('**New members start here!** Get ready for the most bussin\' Fortnite Creative experience 🎮')
        .addFields(
            { 
                name: '1️⃣ Read the Rules First', 
                value: '> Head to #rules and read everything. React with ✅ when done!', 
                inline: false 
            },
            { 
                name: '2️⃣ Choose Your Channels', 
                value: '> #brainrot-chat - General chat\n> #gaming - Gaming discussion\n> #media - Share memes & media', 
                inline: false 
            },
            { 
                name: '3️⃣ Submit Your Maps', 
                value: '> Got a fire Fortnite Creative map? Use `/submit-map` to share it with everyone!', 
                inline: false 
            },
            { 
                name: '4️⃣ Use Bot Commands', 
                value: '> Type `/help` in #bot-commands to see all available commands', 
                inline: false 
            },
            { 
                name: '💡 Pro Tips', 
                value: '```\n- Vote for maps with /vote-map\n- Get random maps with /random-map\n- Use brainrot commands like /sigma, /rizz, /ohio\n- Participate in giveaways with /giveaway\n```', 
                inline: false 
            }
        )
        .setFooter({ text: '🧠 Enjoy your stay and keep it sigma fr fr' })
        .setTimestamp();

    await channel.send({ embeds: [embed] });
}

async function sendBotCommandsInfo(channel) {
    const embed = new EmbedBuilder()
        .setColor('#5865f2')
        .setTitle('🤖 BOT COMMANDS GUIDE')
        .setDescription('**Use this channel to test and use bot commands!** Here\'s a quick guide 📋')
        .addFields(
            { 
                name: '🗺️ MAP COMMANDS', 
                value: '```\n/submit-map - Submit your Creative map code\n/maps - View all available maps\n/random-map - Get a random map to play\n/vote-map - Vote for your favorite map\n/leaderboard - See top voted maps\n```', 
                inline: false 
            },
            { 
                name: '🎪 FUN COMMANDS', 
                value: '```\n/sigma - Get sigma motivation\n/rizz - Rizz lines to impress\n/ohio - Only in Ohio moments\n/skibidi - Skibidi references\n/meme - Random brainrot memes\n/quote - Legendary quotes\n```', 
                inline: false 
            },
            { 
                name: '🎉 COMMUNITY COMMANDS', 
                value: '```\n/giveaway - Create a giveaway\n/poll - Create a poll\n/8ball - Ask a question\n/ship - Ship two people\n/vibe-check - Check the vibe\n```', 
                inline: false 
            },
            { 
                name: '⚙️ UTILITY COMMANDS', 
                value: '```\n/help - Full command list\n/info - Server information\n/ping - Check bot latency\n```', 
                inline: false 
            }
        )
        .setFooter({ text: '💀 Type / to see all commands | BrainrotBot' })
        .setTimestamp();

    await channel.send({ embeds: [embed] });
    await channel.send('**💡 TIP:** Start typing `/` and Discord will show you all available commands with descriptions!');
}

async function sendMapsInfo(channel) {
    const embed = new EmbedBuilder()
        .setColor('#e91e63')
        .setTitle('🗺️ FORTNITE MAPS HUB')
        .setDescription('**Submit, vote, and discover the best Fortnite Creative maps!** 🎮')
        .addFields(
            { 
                name: '📤 HOW TO SUBMIT A MAP', 
                value: '```\n1. Use /submit-map command\n2. Enter your map code (format: 0000-0000-0000)\n3. Add a cool name for your map\n4. Write a brief description\n5. Done! Your map is now in the system\n```', 
                inline: false 
            },
            { 
                name: '⭐ HOW TO VOTE FOR MAPS', 
                value: '```\n1. Use /maps to see all available maps\n2. Find the map ID you want to vote for\n3. Use /vote-map [id] to cast your vote\n4. Check /leaderboard to see top maps\n```', 
                inline: false 
            },
            { 
                name: '🎲 DISCOVER RANDOM MAPS', 
                value: '> Use `/random-map` to get a surprise map to play! Perfect when you can\'t decide what to play 🎯', 
                inline: false 
            },
            { 
                name: '🏆 COMPETE IN THE LEADERBOARD', 
                value: '> The most voted maps get featured in `/leaderboard`. Submit quality maps and get your friends to vote!', 
                inline: false 
            }
        )
        .setFooter({ text: '🧠 Keep the maps coming fr fr no cap' })
        .setTimestamp();

    await channel.send({ embeds: [embed] });
    await channel.send('**🔥 Ready to share your map? Type `/submit-map` to get started!**');
}

async function sendGeneralChatWelcome(channel) {
    const embed = new EmbedBuilder()
        .setColor('#9b59b6')
        .setTitle('🧠 BRAINROT CHAT - WELCOME')
        .setDescription('**Welcome to the main chat, where the brainrot never stops!** 💀')
        .addFields(
            { 
                name: '💬 Chat Rules', 
                value: '> Be respectful, have fun, and keep it bussin\'. Remember server rules apply here too!', 
                inline: false 
            },
            { 
                name: '🎮 What to Talk About', 
                value: '> Fortnite, gaming, memes, life, anything goes! Just keep it appropriate and fun fr fr', 
                inline: false 
            },
            { 
                name: '🎪 Brainrot Vibes', 
                value: '> This is a judgment-free zone for all your brainrot content. Embrace the chaos 🔥', 
                inline: false 
            }
        )
        .setFooter({ text: '💀 Stay sigma, stay based' })
        .setTimestamp();

    await channel.send({ embeds: [embed] });
    await channel.send('**First message! Drop a 💀 if you\'re ready for maximum brainrot!**');
}
