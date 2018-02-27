
const Models = require('../../models');


module.exports = [


  {
    path: '/saveScore',
    method: 'POST',
    handler: (request, response) => {
      Models.users.update({ username: request.payload.username, latestScore: request.payload.latestScore }, {
        where: {
          username: request.payload.username,
        },
        returning: true,
      })
        .then((result) => { response(result[1]); });
    },
  },


];
