const { writeUser, writePledge } = require('./queries.js');

const handleWriteUser = (request, response) => {
	const userNewProject = request.body;
	writeUser(userNewProject)
		.then(() => {
			response.writeHead(201);
			response.end('');
		})
		.catch((error) => {
			console.log('error in post /users');
			response.writeHead(404);
			response.end(error);
		});
};

const handleWritePledge = ({ params: levelId, userId }, response) => {
	writePledge(levelId, userId)
		.then(() => {
			response.writeHead(201);
			response.end('Successfully posted!');
		})
		.catch((error) => {
			console.log('error in post /:projectId/:levelId/:pledgeAmount');
			response.writeHead(404);
			response.end(error);
		});
};

module.exports = { handleWriteUser, handleWritePledge };
