const server = require('../src/server');

describe('Testing the server response', () => {
  it('testing for server response,should return OK', (done) => {
    const options = {
      url: '/questions',
      method: 'GET',
    };
    server.inject(options, (response) => {
      console.log(response.result);
      expect(Object.keys(response.result)).toEqual(['allQuestions']);
      done();
    });
  });
});

