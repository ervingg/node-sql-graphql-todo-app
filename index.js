const express = require('express');
const path = require('path');
const sequelize = require('./utils/database');
const {graphqlHTTP} = require('express-graphql');

const schema = require('./graphql/schema');
const resolver = require('./graphql/resolver');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(graphqlHTTP({
   schema: schema,
   rootValue: resolver,
   graphiql: true
}));

app.use((req, res, next) => {
   res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

async function start() {
   try {
      await sequelize.sync();
      app.listen(PORT);
      console.log('Connection has been established successfully.');
   } catch (error) {
      console.error('Unable to connect to the database:', error);
   }
}

start();