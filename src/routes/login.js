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
          // this userId was either created or found depending upon whether the argment 'created' is true or false
          // do something with this user now
          if (created) {
            console.log('created:', userResult.dataValues);
            response('Created');
          } else {
            console.log('logged:', userResult.dataValues);
            response('Logged in');
          }
        });
    },
  },


];
