const {createClient} = require('redis');
const dotenv = require('dotenv');

dotenv.config();

const redisClient = new createClient();

module.exports = {
    redisClient
}