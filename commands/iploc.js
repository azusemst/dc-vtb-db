const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('iploc')
        .setDescription('ip定位')
        .addStringOption(option => option
            .setName('ip')
            .setDescription('ipv4地址')
            .setRequired(true)),
    async execute(interaction) {
        const ip = interaction.options.getString('ip');
        await interaction.deferReply();
        const pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (pattern.test(ip)) {
            fetch(`https://v.api.aa1.cn/api/api-sqdw/go.php?ip=${ip}`)
                .then((response) => response.text())
                .then((data) => {
                    const res = JSON.parse(data.slice(5));
                    console.log(`${ip} ` + res.meta['Location.Search'].address);
                    interaction.editReply(res.meta['Location.Search'].address);
                })
        }
        else await interaction.editReply('请输入正确的ipv4地址');

    }
}