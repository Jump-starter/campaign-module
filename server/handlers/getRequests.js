const redis = require('redis');
const { getLevels, getAboutInfo } = require('./queries.js');
const { REDIS_PORT } = process.env;
const client = redis.createClient(REDIS_PORT);

const handleLevelsRequest = (request, response) => {
	getLevels(request.params.projectId)
		.then((results) => {
			response.writeHead(200);
			response.end(JSON.stringify(results));
		}).catch((error) => {
			console.log('ERROR in get /levels', error);
			response.writeHead(404);
			response.end('Error in request handler', JSON.stringify(error));
		});
};

const handleAboutInfoRequest = (request, response) => {
	getAboutInfo(request.params.projectId)
		.then((results) => {
			response.writeHead(200);
			response.end(JSON.stringify(results));
		})
		.catch((error) => {
			console.log('ERROR in get /about', error);
			response.writeHead(404);
			response.end(JSON.stringify(error));
		});
};

const cacheLevel = (request, response, next) => {
	client.get(request.params.projectId, (error, data) => {
		if (error) throw error;
		if (data !== null) {
			response.writeHead(200)
			response.end(data);
		} else {
			getLevels(request.params.projectId)
				.then((result) => {
					client.set(request.params.projectId, JSON.stringify(result))
					response.writeHead(200);
					response.end(JSON.stringify(result));
				})
			// next();
		}
	})
}

const cacheAbout = (request, response, next) => {
	client.get(request.params.projectId, (error, data) => {
		if (error) throw error;
		if (data !== null) {
			response.writeHead(200)
			response.end(data);
		} else {
			getAboutInfo(request.params.projectId)
				.then((result) => {
					client.set(request.params.projectId, JSON.stringify(result))
				})
			next();
		}
	})
}

module.exports = { handleLevelsRequest, handleAboutInfoRequest, cacheLevel, cacheAbout };
