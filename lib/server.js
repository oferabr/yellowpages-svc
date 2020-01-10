const express = require('express');
const helmet = require('helmet');
const app = express();
const cors = require('cors');

const { init: initElasticSearch } = require('./esConnector');
const { initRoutes } = require('../lib/router');

try {
	app.use(cors());
	app.use(helmet());
	const router = initRoutes(express);

	app.use('/yellowPages', router);
	initElasticSearch();
	app.listen(process.env.PORT || 3001);
	console.log('Server up and running...');
} catch (e) {
	console.log('Server failed to start with error:\n', e);
}