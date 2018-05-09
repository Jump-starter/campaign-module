const db = require('../../db/index.js');

const getLevels = (projectId) => {
	return new Promise((resolve, reject) => {
		const query = 'SELECT levels.*, count(*) AS numberbackers from levels JOIN users_levels ON (levels.id = users_levels.level_id) WHERE project_id = $1 GROUP BY levels.id ORDER BY levels.id';
		const values = [projectId];
		db.query(query, values)
			.then((response) => {
				const data = [];
				for (let i = 0; i < response.rows.length; i += 1) {
					const listing = {};
					listing.id = response.rows[i].project_id;
					listing.projectId = response.rows[i].project_id;
					listing.cutoffAmount = response.rows[i].cutoff_amount;
					listing.name = response.rows[i].name;
					listing.description = response.rows[i].description;
					listing.estimatedDelivery = response.rows[i].estimated_delivery;
					listing.shipsTo = response.rows[i].ships_to;
					listing.includes = JSON.parse(response.rows[i].includes);
					listing.maxBackers = response.rows[i].max_backers;
					listing.numberOfBackers = response.rows[i].numberbackers;
					data.push(listing);
				}
				resolve(data);
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
				const data = response.rows[0].about_info;
				resolve(data);
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
