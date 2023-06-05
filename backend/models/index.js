const Team = require('./model.team');
const Player = require('./model.player');

Player.belongsTo(
    Team,
    { as: 'team' }
)

Team.hasMany(Player);



module.exports = {
    Team,
    Player
};
