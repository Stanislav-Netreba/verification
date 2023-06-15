const fetch = require('node-fetch');
const links = require('../configs/links.json');

module.exports = class TanksApi {
    constructor(applicationId) {
        this.applicationId = applicationId;
        this.urls = links;
    }
    async getUserIdByName(name) {
        if (typeof name !== 'string') throw new Error('ERROR_ARGUMENT_IS_NOT_STRING');
        if (name.split(/\s+/g).length > 1) throw new Error('ERROR_STRING_MUST_BE_WITHOUT_SPACES');

        let link = `${this.urls.user_by_nick}?application_id=${this.applicationId}&search=${name}`;

        let response;

        try {
            response = await fetch(link, { method: 'GET' }).then((res) => res.json());
        } catch {
            response = 'noneInfo';
        }
        if (!response?.data?.[0]) return 'noneInfo';
        let account_id = response.data[0].account_id;
        return account_id;
    }

    async getClanIdByUserId(id) {
        let link = `${this.urls.clan_by_user}?application_id=${this.applicationId}&account_id=${id}`;

        let response = await fetch(link, { method: 'GET' }).then((res) => res.json());
        return response?.data?.[id]?.clan_id;
    }

    async getClanInfoByClanId(id) {
        let link = `${this.urls.clan_data}?application_id=${this.applicationId}&clan_id=${id}`;

        let response = await fetch(link, { method: 'GET' }).then((res) => res.json());
        if (!response?.data?.[id]) throw new Error('ERROR_COULD_NOT_FIND_INFO');
        return response.data[id];
    }
};
