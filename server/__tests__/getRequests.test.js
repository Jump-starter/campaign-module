const axios = require('axios');
const supertest = require('supertest');
const app = require('../index.js');
const { handleLevelsRequest, handleAboutInfoRequest } = require('../handlers/getRequests.js');
const db = require('../../db/index.js');
let { getLevels, getAboutInfo } = require('../handlers/queries.js');

describe('GET /levels', () => {
	let request = { params: { projectId: 100 } };
	let response = {};
	getLevels = jest.fn(() => false)

	beforeEach(() => {
		response.writeHead = jest.fn();
	});

	it('should return status code 200', () => {
		return supertest(app)
			.get('/levels/100')
			.then((result) => {
				expect(result.statusCode).toBe(200);
			});
	});

	it('should return all required fields', (done) => {
		// getLevels = jest.fn((projectId) => {
		// 		return new Promise((resolve, reject) => {
		// 			resolve([{
		// 				id: 554,
		// 				project_id: 100,
		// 				cutoff_amount: 98,
		// 				name: 'e-markets',
		// 				description: 'Et incidunt sint ullam quisquam veritatis facere nemo.',
		// 				estimated_delivery: '2018-12-22T19:13:28.000Z',
		// 				ships_to: 'Denmark',
		// 				includes: '["totam fugiat quasi"]',
		// 				max_backers: 144,
		// 				numberbackers: '13',
		// 			}]);
		// 		});
		// 	});

		response.end = (data) => {
			data = JSON.parse(data);
			console.log('RESPONSE=======', data)
			let resultKeys = Object.keys(data[0]);
			expect(resultKeys.length).toBe(10);
			done();
		};

		handleLevelsRequest(request, response);
	});

	// it('should return error if query fails', (done) => {
	// 	request = { params: { projectId: 'a' } };
	// 	let expectedError = new Error('Error in request handler')
	// 	let getLevels = jest.fn();
	//
	// 	response.end = (error) => {
	// 		// console.log(error);
	// 		// expect(error).toThrow();
	// 	}
	// 	handleLevelsRequest(request, response)
	// })
});

describe('GET /about', () => {
	let request = { params: { projectId: 100 } };
	let response = {};

	beforeEach(() => {
		response.writeHead = jest.fn();
	});

	afterAll(() => {
		db.end();
	});

	it('should return a string', (done) => {
		let getAboutInfo = (projectId) => {
			return new Promise((resolve, reject) => {
				resolve([{
					id: 100,
					about_info: 'Sit sed et vero voluptate enim. Quibusdam nam cum perspiciatis quasi eum sint laborum aliquam iure. Unde numquam error.',
				}]);
			});
		};

		response.end = (data) => {
			data = JSON.parse(data);
			expect(typeof data).toBe('string');
			done();
		};

		handleAboutInfoRequest(request, response);
	});
})
