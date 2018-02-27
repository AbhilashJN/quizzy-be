
const Models = require('../../models');


module.exports = [


  {
    path: '/saveScore',
    method: 'POST',
    handler: (request, response) => {
      const req = JSON.parse(request.payload);
      console.log(req, typeof req);
      Models.users.update({ username: req.username, latestScore: req.latestScore }, {
        where: {
          username: req.username,
        },
        returning: true,
      })
        .then((result) => { response(result[1]); });
    },
  },


];
