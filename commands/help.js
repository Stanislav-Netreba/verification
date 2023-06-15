const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let embed = new MessageEmbed({
        title: 'Help Panel',
        description: `Привіт, тримай список команд які я маю :wink:`,
    }).setColor('#ff0000');

    embed.setThumbnail(bot.user.avatarURL({ format: 'png' }));
    let n = args[0];

    if (n != undefined && n != bot.commands.name) n = undefined;

    await bot.commands.forEach((i) => {
        embed.addField(
            `${i.help.name}, ${i.help.aliases.join(', ')}`,
            `\`${i.help.info1}\` \n${i.help.info2}`,
            false
        );
    });

    await message.channel.send(embed);
};

module.exports.help = {
    name: 'help',
    aliases: ['info', 'инфо', 'помощь', 'команды', 'хелп', 'хэлп', 'h'],
    info1: '<prefix>help',
    info2: 'Показывает информацию о командах',
    n: -1,
};
