const server = require('../src/server');

describe('Testing the server response', () => {
  it('testing for server response,should return OK', (done) => {
    const options = {
      url: '/questions',
      method: 'GET',
    };
    server.inject(options, (response) => {
      expect(response.payload).toMatch('OK');
      done();
    });
  });
});

