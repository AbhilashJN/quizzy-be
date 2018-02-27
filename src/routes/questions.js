const fetch = require('node-fetch');
const helpers = require('./helpers.js');


module.exports = [


  {
    path: '/questions',
    method: 'GET',
    handler: (request, response) => {
      const resultPromise = helpers.getQuestionsWithAnswers();
      resultPromise.then(response);
    },
  },


];
