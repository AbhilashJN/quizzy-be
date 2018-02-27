const server = require('../src/server');
const helpers = require('../src/routes/helpers');

const testQuestions = [{
  question: 'What is the capital of India', questionId: 12, option1: 'New Delhi', option2: 'MP', option3: 'UP', option4: 'Bangalore',
}, {
  question: 'What is the capital of Afghanistan', questionId: 23, option1: 'Kabul', option2: 'Tirana', option3: 'Algiers', option4: 'Andorra la Vella',
}, {
  question: 'What is the capital of Marshall Islands', questionId: 45, option1: 'Kabul', option2: 'Antananarivo', option3: 'Majuro', option4: 'Andorra la Vella',
}];

const ansArray = ['{"answer":"New Delhi"}',
  '{"answer":"Kabul"}',
  '{"answer":"Majuro"}',
  '{"answer":"Palikir"}',
  '{"answer":"Majuro"}',
  '{"answer":"Palikir"}',
  '{"answer":"Podgorica"}',
  '{"answer":"Windhoek"}',
  '{"answer":"Abuja"}',
  '{"answer":"Muscat"}',
  '{"answer":"Ngerulmud"}',
  '{"answer":"Antananarivo"}'];

describe('Testing the server response', () => {
  it('testing for server response,should return OK', (done) => {
    const options = {
      url: '/questions',
      method: 'GET',
    };
    server.inject(options, (response) => {
      console.log(response.result);
      expect(response.result).toEqual(helpers.allMerged);
      done();
    });
  });
  //   it('testing getAnswersPromisesArray function,should return array of answer promises', (done) => {
  //     expect(helpers.getAnswersPromisesArray(testQuestions)[0]).toBeInstanceOf(Promise);
  //     done();
  //   });

  it('testing the mergeAnswersWithQuestions function', (done) => {
    const mergedArr = [{
      question: 'What is the capital of India',
      questionId: 12,
      option1: 'New Delhi',
      option2: 'MP',
      option3: 'UP',
      option4: 'Bangalore',
      answer: 'New Delhi',
    }, {
      question: 'What is the capital of Afghanistan',
      questionId: 23,
      option1: 'Kabul',
      option2: 'Tirana',
      option3: 'Algiers',
      option4: 'Andorra la Vella',
      answer: 'Kabul',
    }, {
      question: 'What is the capital of Marshall Islands',
      questionId: 45,
      option1: 'Kabul',
      option2: 'Antananarivo',
      option3: 'Majuro',
      option4: 'Andorra la Vella',
      answer: 'Majuro',
    }];
    expect(helpers.mergeAnswersWithQuestions(testQuestions, ansArray.slice(0, 3))).toEqual(mergedArr);
    done();
  });
});

