const fetch = require('node-fetch');
const rp = require('request-promise');

const getAnswersPromisesArray = (allQuestionsArray) => {
  const secondApiUrl = 'https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findAnswerById/';

  const answersPromisesArray = [];
  allQuestionsArray.map((question) => {
    const quesId = question.questionId;
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
  const getAllQuestionsPromise = fetch(firstApiUrl);
  return getAllQuestionsPromise.then(response => response.json()).then(allQuestionsObj => allQuestionsObj.allQuestions)
    .then((allQuestionsArray) => {
      const answersPromisesArray = getAnswersPromisesArray(allQuestionsArray);
      return Promise.all(answersPromisesArray)
        .then(answersArray => (answersArray))
        .then(answersArray => mergeAnswersWithQuestions(allQuestionsArray, answersArray));
    });
};

const allMerged = [{
  answer: 'New Delhi', option1: 'New Delhi', option2: 'MP', option3: 'UP', option4: 'Bangalore', question: 'What is the capital of India', questionId: 12,
}, {
  answer: 'Kabul', option1: 'Kabul', option2: 'Tirana', option3: 'Algiers', option4: 'Andorra la Vella', question: 'What is the capital of Afghanistan', questionId: 23,
}, {
  answer: 'Majuro', option1: 'Kabul', option2: 'Antananarivo', option3: 'Majuro', option4: 'Andorra la Vella', question: 'What is the capital of Marshall Islands', questionId: 45,
}, {
  answer: 'Palikir', option1: 'Palikir', option2: 'Antananarivo', option3: 'Majuro', option4: 'Andorra la Vella', question: 'What is the capital of Micronesia', questionId: 56,
}, {
  answer: 'Majuro', option1: 'Palikir', option2: 'Monaco', option3: 'Majuro', option4: 'Andorra la Vella', question: 'What is the capital of Monaco', questionId: 67,
}, {
  answer: 'Palikir', option1: 'Palikir', option2: 'Antananarivo', option3: 'Majuro', option4: 'Andorra la Vella', question: 'What is the capital of Micronesia', questionId: 78,
}, {
  answer: 'Podgorica', option1: 'Podgorica', option2: 'Antananarivo', option3: 'Majuro', option4: 'Andorra la Vella', question: 'What is the capital of Montenegro', questionId: 89,
}, {
  answer: 'Windhoek', option1: 'Palikir', option2: 'Antananarivo', option3: 'Windhoek', option4: 'Naypyidaw', question: 'What is the capital of Namibia', questionId: 90,
}, {
  answer: 'Abuja', option1: 'Abuja', option2: 'Antananarivo', option3: 'Majuro', option4: 'Warsaw', question: 'What is the capital of Nigeria', questionId: 102,
}, {
  answer: 'Muscat', option1: 'Palikir', option2: 'Muscat', option3: 'Majuro', option4: 'Warsaw', question: 'What is the capital of Oman', questionId: 120,
}, {
  answer: 'Ngerulmud', option1: 'Palikir', option2: 'Antananarivo', option3: 'Ngerulmud', option4: 'Warsaw', question: 'What is the capital of Palau', questionId: 123,
}, {
  answer: 'Antananarivo', option1: 'Kabul', option2: 'Antananarivo', option3: 'Algiers', option4: 'Andorra la Vella', question: 'What is the capital of Madagascar', questionId: 34,
}];
module.exports = {
  getAnswersPromisesArray,
  getQuestionsWithAnswers,
  mergeAnswersWithQuestions,
  allMerged,
};

