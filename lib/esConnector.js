const { get, head } = require('lodash');
const env = process.env.NODE_ENV || 'default';
const { Client } = require('@elastic/elasticsearch');
const NUMBERS_FROM_STRING_REGEX = /^\d+|\d+\b|\d+(?=\w)/g;

let client;

const init = () => {
	const config = require('../config/appConf');
	const node = get(config, `esConfig.${env}.host`);
	client = new Client({ node });
};

const extractFirstNumber = queryString => head(queryString.match(NUMBERS_FROM_STRING_REGEX));

const getMatchingQuery = queryString => {

	const firstNumberFromString = extractFirstNumber(queryString);
	const simpleQueryString = {
		'query': queryString,
		'fields': ['address', 'name', 'phone_number'],
		'default_operator': 'and'
	};
	return !firstNumberFromString ? {
		'simple_query_string': simpleQueryString
	} :
		{
			'bool': {
				'should': [
					{
						'simple_query_string': simpleQueryString
					},
					{
						'range': {
							'birthday': {
								'lte': `now-${firstNumberFromString}y/d`,
								'gte': `now-${parseInt(firstNumberFromString) + 1}y/d`
							}
						}
					}
				]
			}
		};

};


const search = async queryString => {
	const query = getMatchingQuery(queryString);
	const { body } = await client.search({
		index: 'people',
		body: {
			query
		}
	});
	return body;

};


Object.assign(module.exports, {
	init,
	search
});