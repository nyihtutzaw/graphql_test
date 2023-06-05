const { Team, Player } = require('../models');
const { Op }=require("sequelize");
const { authenticationMiddleware }=require("./../middleware");

const teamResolvers = {
  Query: {
    teams: async (_parent, { keyword }) => {
      try {
        // Logic to fetch teams based on the keyword
        if (keyword){
          const teams = await Team.findAll({
            where: {
              name: { [Op.like]: `%${keyword}%` } // Example filtering by name using Sequelize's "Op.like"
            }
          });
  
          return teams;
        }
        const teams = await Team.findAll();
        return teams;
      } catch (error) {
        // Handle error
        console.error('Error fetching teams:', error);
        throw new Error('Failed to fetch teams');
      }
    },
    team: async (_, { id }) => {
      try {
        const team = await Team.findOne({
          where:{
          id
        }});
        return team;
      } catch (error) {
        throw new Error('Failed to fetch team');
      }
    },
    // Query for fetching other data, if needed
  },
  Mutation: {
    createTeam: authenticationMiddleware(async (_parent, { input }) => {
      try {
        const { name, logo } = input;

        // Logic to create a team with the provided name and logo
        const team = await Team.create({ name, logo });

        return team;
      } catch (error) {
        // Handle error
        console.error('Error creating team:', error);
        throw new Error('Failed to create team');
      }
    }),
    updateTeam: authenticationMiddleware(async (_parent, { id, input }) => {
      try {
        const { name, logo } = input;

        // Logic to update the team with the provided id, name, and logo
        const team = await Team.findByPk(id);

        if (!team) {
          throw new Error('Team not found');
        }

        team.name = name;
        team.logo = logo;
        await team.save();

        return team;
      } catch (error) {
        // Handle error
        console.error('Error updating team:', error);
        throw new Error('Failed to update team');
      }
    }),
    deleteTeam: authenticationMiddleware(async (_parent, { id }) => {
      try {
        // Logic to delete the team with the provided id
        const team = await Team.findByPk(id);

        if (!team) {
          throw new Error('Team not found');
        }

        await team.destroy();

        return true;
      } catch (error) {
        // Handle error
        console.error('Error deleting team:', error);
        throw new Error('Failed to delete team');
      }
    }),
  },
  Team: {
    players: async (parent) => {
      try {
        const players = await Player.findAll({ where: { teamId: parent.id } });
        return players;
      } catch (error) {
        // Handle error
        console.error('Error fetching players for team:', error);
        throw new Error('Failed to fetch players for team');
      }
    },
  },
};

module.exports = teamResolvers;
