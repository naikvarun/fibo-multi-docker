exports.config = {
    REDIS : {
        HOST: process.env.REDIS_HOST,
        PORT: process.env.REDIS_PORT || 6379,
        KEY: process.env.REDIS_FIBO_KEY || 'fib_key',
        CHANNEL: process.env.REDIS_FIBO_CHANNEL || 'fibo_channel'
    }
}