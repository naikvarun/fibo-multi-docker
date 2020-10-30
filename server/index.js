const {config} = require('./config');
const express = require('express');
const cors = require('cors');

// Express setup
const app = express();
app.use(express.json());
app.use(cors());


// Postgres Setup
const {Client} = require('pg');
const pgClient = new Client({
    host: config.PG.HOST,
    port: config.PG.PORT,
    database: config.PG.DATABASE,
    user: config.PG.USER,
    password: config.PG.PASSWORD
});

pgClient.connect()
.then(() => pgClient.query('CREATE TABLE IF NOT EXISTS fibo (fibo_index INT)'))
.then(() => console.log('\'fibo\' table created.'))
.catch(error => console.error(error));


// Redis Connection 
const redisClient = require('redis').createClient({
    host: config.REDIS.HOST,
    port: config.REDIS.PORT
});
const redisPublisher = redisClient.duplicate();

app.get('/fibo/indices', async (req, res) => {
    try {
        const indices = await pgClient.query('select * from fibo');
        res.json(indices.rows);
    } catch(err) {
        res.status(500).json(err);
    }
});

app.get('/fibo/values', async (req, res) => {
    redisClient.hgetall(config.REDIS.KEY, (error, result) => {
        if(error) {
            console.error(error);
            return res.status(500).json(error);
        }
        
        res.json(result ? result: {});
    });
});

app.post('/fibo/:index', async(req, res) => {
    const index = parseInt(req.params.index);
    if(index >=  40 ) {
        return res.status(422).json({message: `Index too high - max 40 - ${index} >= 40`});
    }
    redisClient.hset(config.REDIS.KEY, index, config.APP.HSET_DEFAULT_VALUE);
    redisPublisher.publish(config.REDIS.CHANNEL, index);
    const result = await pgClient.query('select * from fibo where fibo.fibo_index = $1', [index]);
    if( result.rowCount === 0) {
        await pgClient.query('insert into fibo values($1)', [index]);
      }
      res.json({message: `Calculating fibo value for ${index} index`});
});

app.get('/', (req, res) => {
    res.json({ message: 'API Endpoint for Fibonacci Series' });
});


const port = config.APP.PORT;

const server = app.listen(port, () => {
    console.log(`Listening on ${server.address().address}:${server.address().port}`);
});