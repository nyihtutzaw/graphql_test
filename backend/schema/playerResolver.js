const { Player,Team } = require('../models');
const { Op }=require("sequelize");


const playerResolvers = {
  Query: {
    players: async (_parent, { keyword }) => {
      try {
        // Logic to fetch players based on the keyword
        if (keyword){
          const players = await Player.findAll({
            where: {
              name: { [Op.like]: `%${keyword}%` } // Example filtering by name using Sequelize's "Op.like"
            }
          });
  
          return players;
        }
        const players = await Player.findAll();
        return players;
      } catch (error) {
        // Handle error
        console.error('Error fetching players:', error);
        throw new Error('Failed to fetch players');
      }
    },
    player: async (_, { id }) => {
      try {
        const player = await Player.findByPk(id);
        return player;
      } catch (error) {
        throw new Error('Failed to fetch player');
      }
    },
    // Query for fetching other data, if needed
  },
  Mutation: {
    createPlayer: async (_parent, { input }) => {
      try {
        const { name, position, kit,image, teamId } = input;
    
        // Check if the kitNumber already exists for the given teamId
        const existingPlayer = await Player.findOne({ where: { kit: kit, teamId } });
        if (existingPlayer) {
          throw new Error('Player with the same kit number already exists');
        }
    
        const player = await Player.create({ name, position, kitNumber: kit,image, teamId });
    
        return player;
      } catch (error) {
        // Handle error
        console.error('Error creating player:', error);
        throw new Error(`Failed to create player : ${error}`);
      }
    },
    
    updatePlayer: async (_parent, { id, input }) => {
      try {
        const { name,position,kit,teamId,image } = input;

        // Logic to update the team with the provided id, name, and logo
        const player = await Player.findByPk(id);

        if (!player) {
          throw new Error('Player not found');
        }

        player.name = name;
        player.position = position;
        player.kit = kit;
        player.image=image;
        player.teamId = teamId;
        await player.save();

        return player;
      } catch (error) {
        // Handle error
        console.error('Error updating player:', error);
        throw new Error('Failed to update player');
      }
    },
    deleteTeam: async (_parent, { id }) => {
      try {
        // Logic to delete the player with the provided id
        const player = await Player.findByPk(id);

        if (!player) {
          throw new Error('Player not found');
        }

        await player.destroy();

        return true;
      } catch (error) {
        // Handle error
        console.error('Error deleting player:', error);
        throw new Error('Failed to delete player');
      }
    },
  },
  Player: {
    team: async (parent) => {
      try {
        const team= await Team.findOne({ where: { id: parent.teamId } });

        return team;
      } catch (error) {
        // Handle error
        console.error('Error fetching team for player:', error);
        throw new Error('Failed to fetch team for player');
      }
    },
  },
};

module.exports = playerResolvers;
