'use strict'

let ioredis = require('ioredis');
let config = require('config');


let redis = new ioredis(config.redisConfig);




redis.on('connect', function() {
    console.log('redis connected!');
});

redis.on('ready', function() {
    console.log('redis ready!');
});

redis.on('error', function(e) {
    console.log('redis error!');
    console.log(e);
});

redis.on('close', function() {
    console.log('redis close!');
});

module.exports = redis;