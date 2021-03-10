const Discord = require('discord.js');
const config = require('./config.json');
const Market = require('./lib/market');
const Poller = require('./lib/poller');

const webhookClient = new Discord.WebhookClient(config.discord.webhookID, config.discord.webhookToken);

const market = new Market({ apikey: config.twelvedata.apikey });
const poller = new Poller({ interval: config.interval });

let date;

poller.start(async (done) => {
    try {
        // Set current time
        date = new Date();

        // Get market prices
        const price = await market.getPrice(config.symbols);
        console.log('Retrieved market prices:', price);

        done(null, price);

    } catch(err) {
        console.log(`Error: Failed to get market prices for ${config.symbols}`, err);
        done(err);
    }
})

poller.on('poll', async (data) => {
    try {
        // Generate embedded message list
        const messageEmbedList = Object.keys(data).map(symbol => new Discord.MessageEmbed({
            title: symbol,
            description: data[symbol].price,
            color: '#0099ff'
        }));

        // Post to discord via webhoook
        await webhookClient.send(date, {
            username: config.discord.username,
            embeds: messageEmbedList,
        });

        console.log('Successfully posted to discord via webhook');

    } catch(err) {
        console.log('Error: Failed to post using configured discord webhook', err);
        // No-op, try again on next poll
    }
})