const { get, isEmpty } = require('lodash');
const { search } = require('./esConnector');
const sanitizeHtml = require('sanitize-html');
const { mapEsResponse } = require('./mapper');

const isAlive = (req, res) => res.send({ message: `yellow pages server is alive: ${new Date()}` });

const validateQueryString = queryString => {
	if (isEmpty(queryString) || queryString.length < 2)
		throw new Error('Query string should be at least 2 characters');
};


const searchByString = async (req, res) => {
	try {

		const queryString = get(req, 'query.queryString','');
		const sanitizedQueryString = sanitizeHtml(queryString);
		validateQueryString(sanitizedQueryString);
		const esResponse = await search(sanitizedQueryString);
		const response = mapEsResponse(esResponse);

		res.send(response);
	}
	catch (e) {
		console.log(e);
		res.status(500).send({
			error: {
				title:'Request cannot be completed',
				message:'Please try again later'
			}
		});
	}

};

Object.assign(module.exports, {
	isAlive,
	searchByString
});
