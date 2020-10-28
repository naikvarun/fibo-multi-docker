exports.config = {
    REDIS : {
        HOST: process.env.REDIS_HOST,
        PORT: process.env.REDIS_PORT || 6379,
        KEY: process.env.REDIS_FIBO_KEY || 'fib_key',
        CHANNEL: process.env.REDIS_FIBO_CHANNEL || 'fibo_channel'
    },
    PG: {
        HOST: process.env.PG_HOST,
        PORT: process.env.PG_PORT || 5432,
        DATABASE: process.env.PG_DATABASE,
        USER: process.env.PG_USER,
        PASSWORD: process.env.PG_PASSWORD
    },
    APP : {
        PORT: process.env.PORT || 5000,
        HSET_DEFAULT_VALUE: process.env.HSET_DEFAULT_VALUE || 'No Value Set'
    }
}