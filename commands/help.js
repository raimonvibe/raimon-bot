const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Provides a list of available commands.'),
    async execute(interaction, client) {
        const commandList = client.commands.map(command => `/${command.data.name}: ${command.data.description}`).join('\n');
        await interaction.reply({ content: `**Available Commands:**\n${commandList}`, ephemeral: true }); // ephemeral: true makes the message only visible to the user
    },
};