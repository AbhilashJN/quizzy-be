const fetch = require('node-fetch');

const getAnswersPromisesArray = (allQuestionsArray) => {
  const secondApiUrl = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findAnswerById/23';

  const answersPromisesArray = [];
  allQuestionsArray.map((question) => {
    const quesId = question.id;
    const answerPromise = fetch(secondApiUrl + quesId);
    answersPromisesArray.push(answerPromise);
  });
  return answersPromisesArray;
};

const getBooksWithRatings = () => {
  const firstApiUrl = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions';
  const getAllQuestionsPromise = fetch(firstApiUrl).then(response => response.json());
  return getAllQuestionsPromise.then(allQuestionsObj => allQuestionsObj.allQuestions)
    .then(allQuestionsArray => getAnswersPromisesArray(allQuestionsArray));
};


module.exports = {
  getAnswersPromisesArray,
  getBooksWithRatings,
};

