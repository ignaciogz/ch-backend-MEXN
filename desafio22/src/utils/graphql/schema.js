const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Product {
    id: ID!
    title: String,
    price: Float,
    thumbnail: String,
    timestamp: String
  }
  input ProductInput {
    title: String,
    price: Float,
    thumbnail: String
  }
  type Query {
    getProducts: [Product],
  }
  type Mutation {
    createProduct(data: ProductInput): Product,
    updateProduct(id: ID!, data: ProductInput): Product,
    deleteProduct(id: ID!): ID!,
  }
`);

module.exports = schema;