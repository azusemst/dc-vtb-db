const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('name')
        .setDescription('中级开盒工具：随机姓名'),
    async execute(interaction) {
        fetch('https://v.api.aa1.cn/api/api-xingming/index.php')
            .then((response) => response.json())
            .then((data) => { interaction.reply(data.xingming); console.log(data); });

    }
}