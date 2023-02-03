const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sfz')
        .setDescription('姓名身份证二要素校验')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('姓名（可选，输入1跳过）')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('id')
                .setDescription('身份证号码')
                .setRequired(true)),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        const id = interaction.options.getString('id');
        if (id.length != 18) {
            await interaction.reply(':x: 请输入有效的身份证号！');
            return;
        }

        if (name.length > 1) {
            fetch(`https://zj.v.api.aa1.cn/api/eys/?name=${name}&card=${id}`)
                .then((response) => response.json())
                .then((data) => {
                    let res1 = `姓名：${name}\n身份证：${id}\n`;
                    if (data.code == 1) res1 += ':white_check_mark: 二要素校验正确\n';
                    else res1 += ':x: 姓名与身份证不匹配\n';
                    idCheck().then((data) => {
                        let res2;
                        if (data.msg == '身份证校验正确')
                            res2 = ':white_check_mark: 身份证校验正确\n\n```' + JSON.stringify(data.data) + '```';
                        else
                            res2 = ':x: 身份证校验错误';
                        interaction.reply(res1 + res2);
                    });
                });
        }
        else {
            idCheck().then((data) => {
                let res2 = `身份证：${id}\n`;
                if (data.msg == '身份证校验正确')
                    res2 += ':white_check_mark: 身份证校验正确\n\n```' + JSON.stringify(data.data) + '```';
                else
                    res2 += ':x: 身份证校验错误';
                interaction.reply(res2);
            });
        }
        async function idCheck() {
            const response = await fetch(`https://zj.v.api.aa1.cn/api/sfz/?sfz=${id}`);
            return response.json();
        }
    }
}