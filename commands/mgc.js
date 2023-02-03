const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mgc')
        .setDescription('敏感词，违禁词，反政府词检测，模糊匹配')
        .addStringOption(option =>
            option.setName('text')
                .setDescription('输入待检测的文本内容')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('show_text')
                .setDescription('在返回结果中展示输入文本，默认True')),
    async execute(interaction) {
        const text = interaction.options.getString('text');
        const show = interaction.options.getBoolean('show_text') ?? true;
        await interaction.deferReply();
        let msg = '';
        if (show) {
            msg = '您的文本：\n```' + text + '```\n';
        }
        fetch(`https://v.api.aa1.cn/api/api-mgc/index.php?msg=${text}`)
            .then((response) => response.json())
            .then((data) => {
                msg += data.desc;
                interaction.editReply(msg);
                console.log(text + ' ' + JSON.stringify(data));
            });

    }
}