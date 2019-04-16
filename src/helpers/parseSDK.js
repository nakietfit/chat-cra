var Parse = require('parse');
const Config = require('./config.json').PARSE_CONFIG;

Parse.initialize(Config.APP_ID, Config.PARSE_SERVER_JAVASCRIPT_KEY, Config.MASTER_KEY);

Parse.serverURL = Config.SERVER_URL;

module.exports = Parse;