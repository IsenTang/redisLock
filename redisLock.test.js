'use strict'

let redisLock = require('./redisLock').getLock;
let delLock = require('./redisLock').delLock;
let expect = require('chai').expect;


describe('redisLock', function() {
    describe('firstTime', function() {
        it('should return true when get the lock', async function() {
            expect(await redisLock('test')).to.be.ok;
        });
    });

    describe('delLock', function() {
        it('should return true when del the lock', async function() {
            expect(await delLock('test')).to.be.ok;
        });
    });

});