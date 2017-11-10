'use strict'

let RedisConnect = require('./redisConnection');

module.exports = getLock = () => {
    let currentTimeStamp = new Date().getTime();
    let result = await RedisConnect.setnx(key, currentTimeStamp);
    if (result == 1) {
        return true;
    } else {
        let currentTime = new Date().getTime();
        let lockTime = await RedisConnect.get(key);
        if (lockTime != null && currentTime - lockTime >= 120000) {
            errCount++;
            let oldValue = await RedisConnect.getset(key, currentTime);
            if (oldValue == lockTime) {
                //获得锁
                return true;
            } else {
                await setNx(key);
            }
        } else {
            await sleep(5);
            // console.log('errCount = ' + errCount++);
            let result = await setNx(key);
            return result;
        }
    };
}


async function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve('');
        }, ms);
    })
}