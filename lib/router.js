const { isAlive, searchByString } = require('./controller');

const initRoutes = express => {

	const router = express.Router();
	router.get('/search', searchByString);
	router.get('/isAlive', isAlive);
	return router;
};

Object.assign(module.exports,
	{ initRoutes }
);
