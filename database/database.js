
const { Pool } = require('pg');

// Create new pool.
const clientPool = new Pool({
	user: process.env.MYBLOG_USER,
	password: process.env.MYBLOG_PASSWORD,
	host: process.env.MYBLOG_HOST,
	port: process.env.MYBLOG_PORT,
	database: process.env.MYBLOG_DATABASE,
	max: 10,
	connectionTimeoutMillis: 0,
	idleTimeoutMillis: 0
});

// Make query -- Give a SQL query to send to the database
// as well as a function that indicates what you want to do
// with the output you get back.
const makeQuery = function(_query_obj, resultFunction) {
	clientPool.query(_query_obj)
	.then((_results) => resultFunction(_results))
	.catch((_error) => console.log(_error))
}

module.exports = { clientPool, makeQuery };
