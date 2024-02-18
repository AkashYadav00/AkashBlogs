const redis = require("redis");

const HOST = "127.0.0.1";
const PORT = "6379";


var redisClient = redis.createClient({
    port: PORT,
    host: HOST,
    // password  : 'redispassword',
});

redisClient.on('connect', function () {
    console.log('Redis Database connected' + '\n');
});

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
    process.exit();
});


async function connectToRedis() {
    try {
        await redisClient.connect();
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }
}

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

async function init() {
    try {
        // Configure Redis with LRU eviction policy
        await connectToRedis();
        await redisClient.sendCommand(['config', 'set', 'maxmemory', '100mb']); // Set maximum memory limit (e.g., 100 MB)
        await redisClient.sendCommand(['config', 'set', 'maxmemory-policy', 'volatile-lru']); // Set eviction policy (e.g., Volatile LRU)
    } catch (error) {
        console.error('Error configuring Redis:', error);
    }
}

module.exports = {
    init,
    deleteKey,
    get,
    set
};