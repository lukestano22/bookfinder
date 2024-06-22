//importing typedefs from schemas folder
const {typeDefs} = require('./typeDefs');
//importing resolvers from schema folder
const {resolvers} = require('./resolvers');
//exporting typedefs and resolvers
module.exports = {typeDefs, resolvers};
