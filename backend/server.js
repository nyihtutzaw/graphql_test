const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const port = process.env.PORT || '3000';
const app = express();
const sequelize = require('./database/index');
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const isAuthenticated = !!decodedToken;
      return { token: decodedToken, isAuthenticated };
    } catch (error) {
      return { token: null, isAuthenticated: false };
    }
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });
}

startServer().then(() => {
  // Start the server
  app.listen({ port: port }, () => {
    sequelize
      .sync()
      .then(() => {
        console.log('Database synced');
      })
      .catch((error) => {
        console.error('Error syncing database:', error);
      });
    console.log(`Server is running on http://localhost:${port}${server.graphqlPath}`);
  });
}).catch((err) => {
  console.error(err);
});
