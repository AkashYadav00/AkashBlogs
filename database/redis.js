const redis = require("redis");

const redisUrlExternal = "rediss://red-cn4bvbvqd2ns73elfn40:nlDJaf3pWuFW2CnqRuKrLN0bxd41vycM@singapore-redis.render.com:6379";
const redisUrlInternal = "redis://red-cn4bvbvqd2ns73elfn40:6379";
const parsedUrl = new URL(redisUrlInternal);

const redisClient = redis.createClient({
    port: parsedUrl.port,
    host: parsedUrl.hostname,
    auth_pass: parsedUrl.password,
    tls: {
        rejectUnauthorized: false // For self-signed certificates (remove this in production)
    }
});

redisClient.connect();

redisClient.on('reconnecting', function () {
    console.log('Redis client reconnecting');
});

redisClient.on('ready', function () {
    console.log('Redis client is ready');
});

redisClient.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

redisClient.on('end', function () {
    console.log('\nRedis client disconnected');
    console.log('Server is going down now...');
});

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