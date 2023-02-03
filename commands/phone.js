const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('phone')
        .setDescription('手机号归属地')
        .addIntegerOption(option => option.setName('number')
            .setDescription('手机号')
            .setRequired(true)
            .setMinValue(10000000000)
            .setMaxValue(19999999999)),
    async execute(interaction) {
        const number = interaction.options.getInteger('number');
        interaction.deferReply();
        fetch(`https://v.api.aa1.cn/api/phone/guishu-api.php?phone=${number.toString()}`)
            .then((response) => response.json())
            .then((data) => {
                interaction.editReply(`${number.toString()}\n` + JSON.stringify(data.data));
                console.log(JSON.stringify(data));
            });

    }
}