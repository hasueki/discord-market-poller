# discord-market-poller

The discord-market-poller is a simple Node.js app that is capable of polling current stock prices and posting prices to a configured Discord channel. Market price data is retrived using twelvedata APIs and Discord integration requires a webhook URL.

## Getting started

- Install Node.js, https://nodejs.org/en/download/
- Set configuration variables in [config.json](./config.json)
- Install dependencies
  ```shell
  npm install
  ```
- Start server
  ```
  npm start
  ```
