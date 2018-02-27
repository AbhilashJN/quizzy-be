const server = require('../src/server');
const Models = require('../models');

describe('Testing the saveScore route', () => {
  beforeAll((done) => {
    Models.users.destroy({ truncate: true, restartIdentity: true })
      .then(() => {
        Models.users.create({ username: 'firstUser', latestScore: 6 })
          .then(() => {
            done();
          });
      });
  });

  afterAll((done) => {
    Models.users.destroy({ truncate: true, restartIdentity: true })
      .then(() => { done(); });
  });


  it('Testing for update of score', (done) => {
    const options = {
      url: '/saveScore',
      method: 'POST',
      payload: {
        username: 'firstUser',
        latestScore: 9,
      },
    };

    server.inject(options, (response) => {
      expect(response.result[0].latestScore).toBe(9);
      done();
    });
  });
});

