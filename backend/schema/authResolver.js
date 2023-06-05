const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
dotenv.config();

const users = [
  { id: 1, username: 'admin', password: '$2b$10$VPfMwZLT688LvfqXyWo5huhRuTI7pVCXd83CN5ZTxbBFaba6DqbNm' }, // example user: admin / password: admin
];

const secretKey =  process.env.JWT_SECRET; 

const authResolvers = {
  Mutation: {
    login: async (_parent, { username, password }) => {
      try {

        // Authenticate the user
        const user = users.find((u) => u.username === username);
        if (!user) {
          throw new Error('User not found');
        }
      
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new Error('Invalid password');
        }

        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' }); // adjust the expiration time as needed

        return { token };
      } catch (error) {
        // Handle authentication error
        console.error('Authentication failed:', error);
        throw new Error('Authentication failed');
      }
    },
  },
};

module.exports = authResolvers;
