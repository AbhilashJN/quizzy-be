const fetch = require('node-fetch');

const getBooksWithRatings = () => {
  const firstApiUrl = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions';
  const getAllQuestionsPromise = fetch(firstApiUrl).then(response => response.json());
  return getAllQuestionsPromise;
};


module.exports = [


  {
    path: '/questions',
    method: 'GET',
    handler: (request, response) => {
      const resultPromise = getBooksWithRatings();
      resultPromise.then(response);
    },
  },


];
