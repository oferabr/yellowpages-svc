const moment = require('moment');
const { get, map } = require('lodash');

const getAge = birthday => {

	const birthdayDate = moment(birthday, 'YYYY-MM-DD');
	return moment().diff(birthdayDate, 'years');
};

const mapEsResponse = (esResponse) => {
	const hits = get(esResponse, 'hits.hits', {});
	const people = map(hits, hit => {
		const age = getAge(get(hit, '_source.birthday'));
		return {
			age,
			address: get(hit, '_source.address'),
			name: get(hit, '_source.name'),
			phoneNumber: get(hit, '_source.phone_number'),
			picture: get(hit, '_source.picture'),
			birthday: get(hit, '_source.birthday')
		};
	});
	return { people };
};


Object.assign(module.exports, {
	mapEsResponse
});