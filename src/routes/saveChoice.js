const Models = require('../../models');

module.exports = [


  {
    path: '/saveChoice',
    method: 'POST',
    handler: (request, response) => {
      const reqPayload = JSON.parse(request.payload);
      const reqUser = reqPayload.username;
      const reqQuesId = reqPayload.questionId;
      const reqChoice = reqPayload.choice;

      Models.usersChoices.findAll({ where: { username: reqUser, questionId: reqQuesId } })
        .then((result) => {
          if (result.length === 0) {
            Models.usersChoices.create({ username: reqUser, questionId: reqQuesId, choice: reqChoice }).then(() => {
              response('Response Saved');
            });
          } else {
            Models.usersChoices.update({ username: reqUser, questionId: reqQuesId, choice: reqChoice }, {
              where: {
                username: reqUser, questionId: reqQuesId,
              },
            }).then(() => {
              response('Response Updated');
            });
          }
        });
    },
  },


];
