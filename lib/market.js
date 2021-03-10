const axios = require('axios');

module.exports = class Market {
    constructor(options) {
        this.axios = axios.create({
            baseURL: 'https://api.twelvedata.com',
            timeout: 5000,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        this.apikey = options?.apikey;
    }

    async getPrice(symbol) {

        if (symbol?.split(',').length === 1) {
            symbol += ',';
        }

        const resp = await this.axios.get(`/price?apikey=${this.apikey}&symbol=${symbol}`);

        return resp.data;
    }
}