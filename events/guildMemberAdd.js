const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    execute(member, client) {
        const welcomeChannelId = 'YOUR_WELCOME_CHANNEL_ID'; // Replace with your welcome channel ID
        const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);

        if (welcomeChannel) {
            welcomeChannel.send(`Welcome to the server, ${member}!`);
        } else {
            console.log('Welcome channel not found.');
        }
    },
};