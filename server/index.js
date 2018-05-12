require('newrelic');
const express = require('express');
const cluster = require('cluster');
const parser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { handleLevelsRequest, handleAboutInfoRequest, cacheLevel, cacheAbout } = require('./handlers/getRequests.js');
const { handleWriteUser, handleWritePledge } = require('./handlers/postRequests.js');

if (cluster.isMaster) {
	const cpuCount = require('os').cpus().length;
	// Create a worker for each CPU
	for (var i = 0; i < cpuCount; i += 1) {
		cluster.fork();
	}
} else {
	let app = express();
	let port = process.env.PORT || 3003;

	// Logging and parsing
	// app.use(morgan('dev'));
	app.use(parser.json());
	app.use(parser.urlencoded({ extended: true }));
	app.use(cors());
	app.use('/:projectId', express.static(`${__dirname}/../client/dist`));

	// Routes
	app.get('/levels/:projectId', cacheLevel, handleLevelsRequest);
	app.get('/about/:projectId', handleAboutInfoRequest);
	app.post('/users', handleWriteUser);
	app.post('/:projectId/:levelId/:pledgeAmount', handleWritePledge);

	app.listen(port, () => {
		console.log(`listening on http://localhost:${port}`);
	});
	module.exports = app;
}
