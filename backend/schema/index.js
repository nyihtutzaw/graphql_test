const { gql } = require('apollo-server-express');
const { merge } = require('lodash');
const teamResolvers = require("./teamResolver");
const playerResolvers = require("./playerResolver");
const authResolvers = require('./authResolver');

// Define your schema
const typeDefs = gql`
  type Team {
    id: ID!
    name: String!
    logo: String
    players: [Player]
  }

  type Player {
    id: ID!
    name: String!
    position: String!
    image: String
    kit: Int!
    teamId: Int!
    team: Team
  }

  input TeamInput {
    name: String!
    logo: String!
  }

  input PlayerInput {
    name: String!
    position: String!
    image: String!
    kit: Int!
    teamId: Int!
  }

  type AuthPayload {
    token: String!
  }

  type Query {
    teams(keyword: String): [Team]
    team(id: ID!): Team
    players(keyword: String): [Player]
    player(id: ID!): Player
  }

  type Mutation {
    createTeam(input: TeamInput): Team
    updateTeam(id: ID!, input: TeamInput): Team
    deleteTeam(id: ID!): Boolean
    createPlayer(input: PlayerInput): Player
    updatePlayer(id: ID!, input: PlayerInput): Player
    deletePlayer(id: ID!): Boolean
    login(username: String!, password: String!): AuthPayload
  }
`;

// Merge the resolvers from separate files
const resolvers = merge(teamResolvers, playerResolvers, authResolvers);

module.exports = { typeDefs, resolvers };
