const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('face')
        .setDescription('中级开盒工具：AI生成随机人脸'),
    async execute(interaction) {
        await interaction.reply('https://thispersondoesnotexist.com/image');
    }
}