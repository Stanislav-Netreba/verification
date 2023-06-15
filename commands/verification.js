const tanksApi = require('../api_tanks/api.js');
const config = require('../configs/config.json');
const verNicknames = require('../configs/verified_nicks.json');
const fs = require('fs');
const api = new tanksApi(config.application_id);

module.exports.run = async (bot, message, args) => {
    await message.delete();

    if (message.channel.id !== config.serwer_info.id_channel) return;
    if (
        (await message.member.roles.cache.find((role) => role.id == '1039445297199337482')) ||
        (await message.member.roles.cache.find((role) => role.id == '1039446595613233152'))
    ) {
        let msg = await message.channel.send('Ти вже верифікований');
        return msg.delete({ timeout: 5 * 1e3 });
    }

    let tankNickname = args[0];
    if (!tankNickname) {
        let msg = message.channel.send('Напиши нік');
        return msg.delete({ timeout: 5 * 1e3 });
    }

    if (verNicknames.includes(tankNickname)) {
        let msg = await message.channel.send(
            'Цей нікнейм вже верифікований, напиши свій справжній нікнейм або звернися до модерації'
        );
        return msg.delete({ timeout: 5 * 1e3 });
    }

    let userId = await api.getUserIdByName(tankNickname);

    if (userId == 'noneInfo') {
        let msg = await message.channel.send('Такого нінкейму не існує');
        return msg.delete({ timeout: 5 * 1e3 });
    }

    let clanId = await api.getClanIdByUserId(userId).catch(console.log);
    if (!clanId) {
        let msg = await message.channel.send('Цей акаунт без клану');
        return msg.delete({ timeout: 5 * 1e3 });
    }
    let clanData = await api.getClanInfoByClanId(clanId).catch(console.log);

    if (clanData.name !== config.serwer_info.main_clan_name) {
        await message.member.roles.add(config.serwer_info.another_clan_role);
        let msg = await message.channel.send('Ви отримали роль іншого клану');
        fs.writeFileSync('./configs/verified_nicks.json', JSON.stringify(verNicknames));
        return msg.delete({ timeout: 5 * 1e3 });
    }

    await message.member.roles.remove(config.serwer_info.start_role);
    await message.member.roles.add(config.serwer_info.clan_role);

    verNicknames.push(tankNickname);

    fs.writeFileSync('./configs/verified_nicks.json', JSON.stringify(verNicknames));

    let msg = await message.channel.send(`Ви отримали роль клану ${config.serwer_info.main_clan_name}`); //prettier-ignore
    msg.delete({ timeout: 5 * 1e3 });
};

module.exports.help = {
    name: 'verification',
    aliases: ['v'],
    info1: '<prefix>verification [tank nickname]',
    info2: 'Верифікація для нових учасників',
    n: -1,
};
