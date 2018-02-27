const fetch = require('node-fetch');
const rp = require('request-promise');

const getAnswersPromisesArray = (allQuestionsArray) => {
  const secondApiUrl = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findAnswerById/';

  const answersPromisesArray = [];
  allQuestionsArray.map((question) => {
    const quesId = question.questionId;
    console.log(secondApiUrl + quesId);
    const answerPromise = rp(secondApiUrl + quesId);
    answersPromisesArray.push(answerPromise);
  });
  return answersPromisesArray;
};


const mergeAnswersWithQuestions = (allQuestionsArray, answersArray) => {
  const quesWithAns = allQuestionsArray.map((ques, index) => {
    const newQues = { ...ques };
    newQues.answer = JSON.parse(answersArray[index]).answer;
    return newQues;
  });
  return quesWithAns;
};


const getQuestionsWithAnswers = () => {
  const firstApiUrl = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allQuestions';
  const getAllQuestionsPromise = fetch(firstApiUrl).then(response => response.json());
  return getAllQuestionsPromise.then(allQuestionsObj => allQuestionsObj.allQuestions)
    .then(allQuestionsArray => getAnswersPromisesArray(allQuestionsArray))
    .then(answersPromisesArray => Promise.all(answersPromisesArray))
    .then(answersArray => (answersArray));
};


module.exports = {
  getAnswersPromisesArray,
  getQuestionsWithAnswers,
  mergeAnswersWithQuestions,
};

