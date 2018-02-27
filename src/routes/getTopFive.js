const Models = require('../../models');
const sequelize = require('sequelize');

module.exports = [


  {
    path: '/getTopFive',
    method: 'GET',
    handler: (request, response) => {
      Models.users.findAll({
        order: [
          ['latestScore', 'DESC'],
        ],
        limit: 5,
        attributes: ['username', 'latestScore'],
      }).then(response);
    },

  },


];

