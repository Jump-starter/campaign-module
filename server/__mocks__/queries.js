
const getLevels = (projectId) => {
	return new Promise((resolve, reject) => {
		resolve([{
			id: 554,
			project_id: 100,
			cutoff_amount: 98,
			name: 'e-markets',
			description: 'Et incidunt sint ullam quisquam veritatis facere nemo.',
			estimated_delivery: '2018-12-22T19:13:28.000Z',
			ships_to: 'Denmark',
			includes: '["totam fugiat quasi"]',
			max_backers: 144,
			numberbackers: '13',
		}]);
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
