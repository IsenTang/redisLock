'use strict'

let RedisConnect = require('./redisConnection');
let _ = require('lodash');
let VError = require('verror');


module.exports = {
    getLock: async(key) => {
        try {
            let currentTimeStamp = new Date().getTime();
            let lockName = key + '.lock';
            let result = await RedisConnect.setnx(lockName, currentTimeStamp);
            if (result == 1) {
                return true;
            } else {
                let currentTime = new Date().getTime();
                let lockTime = await RedisConnect.get(lockName);
                if (lockTime != null && currentTime - lockTime >= 120000) {
                    let oldValue = await RedisConnect.getset(lockName, currentTime);
                    if (oldValue == lockTime) {
                        //获得锁
                        return true;
                    } else {
                        await getLock(lockName);
                    }
                } else {
                    await sleep(5);
                    // console.log('errCount = ' + errCount++);
                    let result = await getLock(lockName);
                    return result;
                }
            };
        } catch (error) {
            throw error;
        }
    },

    delLock: async(key) => {
        try {
            if (!_.isEmpty(key)) {
                await RedisConnect.del(key + '.lock');
                return true;
            } else {
                throw new VError('key is undefinded');
            }
        } catch (error) {
            throw error;
        }
    }
}





async function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            resolve();
        }, ms);
    })
}