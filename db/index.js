const { Client } = require('pg');

const defaultConnection = process.env.DATABASE_URL || 'postgres://localhost:5432/jumpstarter';
// const query = require('../helpers/createdb');

// pools will use environment variables
// for connection information
const client = new Client({
	connectionString: defaultConnection,
});

client.connect();

module.exports = client;
