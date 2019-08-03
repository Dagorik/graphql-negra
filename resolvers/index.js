const UserMutations = require('./User/Mutations');
const UserQueries = require('./User/Querys');
const ZonesMutations = require('./Zones/Mutation');
const ZonesQueries =  require('./Zones/Query');
const { EmailAddress } = require('graphql-scalars');


module.exports = {
	EmailAddress,
	Mutation:{
		...UserMutations, //Split Objects
		...ZonesMutations
	},
	Query:{
		...UserQueries,
		...ZonesQueries
	}
}