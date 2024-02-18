const redis = require("redis");

// const redisUrlExternal = "rediss://red-cn4bvbvqd2ns73elfn40:nlDJaf3pWuFW2CnqRuKrLN0bxd41vycM@singapore-redis.render.com:6379";
const redisUrlInternal = "redis://red-cn4bvbvqd2ns73elfn40:6379";

let redisClient;

(async () => {
    redisClient = redis.createClient({
        url: redisUrlInternal // replace it with redisUrlExternal to test on local
    });
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
    await redisClient.connect();
    console.log("Redis connection successful");
  })();
  

async function set(key, value) {
    await redisClient.set(key, JSON.stringify(value));
    return value;
}

async function get(key) {
    const value = await redisClient.get(key);
    return JSON.parse(value);
}

async function deleteKey(key) {
    try {
        const result = await redisClient.del(key);
        console.log(`Key '${key}' deleted successfully.`);
        return result === 1;
    } catch (error) {
        console.error(`Error deleting key '${key}':`, error);
        return false;
    }
}

module.exports = {
    deleteKey,
    get,
    set
};