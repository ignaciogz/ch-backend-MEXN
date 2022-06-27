const { config } = require('../../config');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema');
const endpoints = require('./endpoints');

const graphqlServer = graphqlHTTP({
    schema: schema,
    rootValue: endpoints,
    graphiql: config.USE_GRAPHIQL,
});

module.exports = graphqlServer;