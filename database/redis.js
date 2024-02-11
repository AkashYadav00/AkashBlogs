const redis = require("redis");

const HOST = "127.0.0.1";
const PORT = "6379";

console.log("Inside redis .js");

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
        console.log('Connected to Redis');
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }
}

// Call the async function
connectToRedis();

module.exports.set = (key, value) => {
    redisClient.set(key, value, redis.print);
    return 'done';
}

module.exports.get = (key) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, function (error, result) {
            if (error) {
                console.log(error);
                reject(error);
            }
            resolve(result);
        });
    });
}

module.exports.close = () => {
    client.quit();
}