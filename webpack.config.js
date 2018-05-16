var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

const common = {
	context: __dirname + '/client',
	module: {
		rules: [
			{
				test: /\.jsx?/,
				include: SRC_DIR,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'es2015'],
				},
			},
			{
				test: /\.scss$/,
				use: [{
					loader: 'style-loader',
				}, {
					loader: 'css-loader',
				}, {
					loader: 'sass-loader',
				}],
			},
		],
	},
};

const client = {
	entry: `${SRC_DIR}/client.js`,
	output: {
		path: DIST_DIR,
		filename: 'app.js'
	}
};

const server = {
	entry: `${SRC_DIR}/server.js`,
	target: 'node',
	output: {
		path: DIST_DIR,
		filename: 'app-server.js',
		libraryTarget: 'commonjs-module'
	}
};

module.exports = [
	Object.assign({}, common, client),
	Object.assign({}, common, server)
]
