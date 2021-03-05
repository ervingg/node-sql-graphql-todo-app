const {buildSchema } = require('graphql');

module.exports = buildSchema(`
   type User {
      name: String!
      age: Int!
      email: String!
   }

   type TestType {
      count: Int!
      users: [User!]!
   }

   input UserInput {
      name: String!
      email: String!
   }

   type Todo {
      id: ID!
      title: String!
      done: Boolean!
      createdAt: String
      updatedAt: String
   }

   input TodoInput {
      title: String!
   }
   
   type Query {
      test: TestType!
      random(min: Int!, max: Int!, count: Int!): [Float!]!
      getTodos: [Todo!]!
   }
   
   type Mutation {
      addTestUser(user: UserInput!): User!
      createTodo(todo: TodoInput!): Todo!
   }
`)