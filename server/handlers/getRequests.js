const { getLevels, getAboutInfo } = require('./queries.js');

const handleLevelsRequest = (request, response) => {
	getLevels(request.params.projectId)
		.then((results) => {
			const data = [];
			for (let i = 0; i < results.length; i += 1) {
				const listing = {};
				listing.id = results[i].project_id;
				listing.projectId = results[i].project_id;
				listing.cutoffAmount = results[i].cutoff_amount;
				listing.name = results[i].name;
				listing.description = results[i].description;
				listing.estimatedDelivery = results[i].estimated_delivery;
				listing.shipsTo = results[i].ships_to;
				listing.includes = JSON.parse(results[i].includes);
				listing.maxBackers = results[i].max_backers;
				listing.numberOfBackers = results[i].numberbackers;
				data.push(listing);
			}
			response.writeHead(200);
			response.end(JSON.stringify(data));
		}).catch((error) => {
			console.log('ERROR in get /levels', error);
			response.writeHead(404);
			response.end('Error in handle request', error);
		});
};

const handleAboutInfoRequest = (request, response) => {
	getAboutInfo(request.params.projectId)
		.then((results) => {
			const data = results[0].about_info;
			response.writeHead(200);
			response.end(JSON.stringify(data));
		})
		.catch((error) => {
			console.log('ERROR in get /about', error);
			response.writeHead(404);
			response.end(error);
		});
};

module.exports = { handleLevelsRequest, handleAboutInfoRequest };
