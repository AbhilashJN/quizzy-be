const server = require('../src/server');
const helpers = require('../src/routes/helpers');

const testQuestions = [{
  question: 'What is the capital of India', questionId: 12, option1: 'New Delhi', option2: 'MP', option3: 'UP', option4: 'Bangalore',
}, {
  question: 'What is the capital of Afghanistan', questionId: 23, option1: 'Kabul', option2: 'Tirana', option3: 'Algiers', option4: 'Andorra la Vella',
}, {
  question: 'What is the capital of Marshall Islands', questionId: 45, option1: 'Kabul', option2: 'Antananarivo', option3: 'Majuro', option4: 'Andorra la Vella',
}];

describe('Testing the server response', () => {
//   it('testing for server response,should return OK', (done) => {
//     const options = {
//       url: '/questions',
//       method: 'GET',
//     };
//     server.inject(options, (response) => {
//       console.log(response.result);
//       expect(Object.keys(response.result)).toEqual(['allQuestions']);
//       done();
//     });
//   });
  it('testing getAnswersPromisesArray function,should return array of answer promises', (done) => {
    expect(helpers.getAnswersPromisesArray(testQuestions)[0]).toBeInstanceOf(Promise);
    done();
  });
});

