const db = require('../../db/index.js');

const getLevels = (projectId) => {
	return new Promise((resolve, reject) => {
		const query = 'SELECT levels.*, count(*) AS numberbackers from levels JOIN users_levels ON (levels.id = users_levels.level_id) WHERE project_id = $1 GROUP BY levels.id ORDER BY levels.id';
		const values = [projectId];
		db.query(query, values)
			.then((response) => {
				resolve(response.rows);
			})
			.catch((error) => {
				console.error(error.stack);
				reject(error);
			});
	});
};

const getAboutInfo = (projectId) => {
	return new Promise((resolve, reject) => {
		const query = 'SELECT about_info FROM projects WHERE id = $1';
		const values = [projectId];
		db.query(query, values)
			.then((response) => {
				console.log(response.rows);
				resolve(response.rows);
			})
			.catch((error) => {
				console.error(error.stack);
				reject(error);
			});
	});
};

const getUser = (user) => {
	return new Promise((resolve, reject) => {
		const query = 'SELECT * FROM users WHERE user_id = $1';
		const values = [user];
		db.query(query, values)
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				console.error(error.stack);
				reject(error);
			});
	});
};

const writeUser = () => {
	return new Promise((resolve, reject) => {
		const query = 'INSERT INTO users DEFAULT VALUES';
		db.query(query)
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				console.error(error.stack);
				reject(error);
			});
	});
};

const writePledge = (levelId, userId) => {
	return new Promise((resolve, reject) => {
		const query = 'INSERT INTO users_levels (level_id, user_id) VALUES ($1, $2)';
		const values = [levelId, userId];
		db.query(query, values)
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				console.error(error.stack);
				reject(error);
			});
	});
};

module.exports = {
	getLevels,
	getAboutInfo,
	getUser,
	writeUser,
	writePledge,
};
