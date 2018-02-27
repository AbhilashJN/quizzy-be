const Models = require('../../models');

module.exports = [


  {
    path: '/login',
    method: 'POST',
    handler: (request, response) => {
      const reqUsername = request.payload.username;
      Models.users.findOrCreate({
        where: {
          username: reqUsername,
        },
      })
        .spread((userResult, created) => {
          if (created) {
            console.log('created:', userResult.dataValues);
            const respObj = { username: userResult.dataValues.username, latestScore: 0, choices: [] };
            response(respObj);
          } else {
            const dblatestScore = userResult.dataValues.latestScore;
            // console.log('::::::::', userResult.dataValues.latestScore);
            Models.usersChoices.findAll({ where: { username: reqUsername }, attributes: ['questionId', 'choice'] }).then((choicesArray) => {
              const valuesArray = choicesArray.map(choice => choice.dataValues);
              //   console.log('::::', valuesArray);
              const respObj = { username: userResult.dataValues.username, latestScore: dblatestScore, choices: valuesArray };
              //   console.log(respObj);
              response(respObj);
            });
          }
        });
    },
  },


];
