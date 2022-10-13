const { createPool } = require('mysql2');

const pool = createPool({
	connectionLimit: 4,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME
})

module.exports = pool;