const {config} = require('./config');
const redis = require('redis');

const redisClient = redis.createClient({
    host: config.REDIS.HOST,
    port: config.REDIS.PORT,
    retry_strategy: () => 1000
});

const redisSubscripton = redisClient.duplicate();
redisClient.on('ready', () => {
    console.log(`Connected to ${config.REDIS.HOST}:${config.REDIS.PORT}`);
});

redisClient.on('error', ()=> console.error('Error connecting to redis'));
const fib = (index) => {
    index = index-1;
    const fiboValues = [1, 1]

    if ( index <= 1 ) {
        return fiboValues[index];
    }
    while (index > 2) {
        const tmp = fiboValues[0] + fiboValues[1];
        fiboValues[0] = fiboValues[1];
        fiboValues[1] = tmp;
        index --;
    }
    return fiboValues[1];
}

redisSubscripton.on('message', (channel, message) => {
    console.log(`Recieved '${channel}: '${message}'`)
    redisClient.hset(config.REDIS.KEY, message, fib(parseInt(message)));
});

redisSubscripton.subscribe(config.REDIS.CHANNEL);