const server = require('../src/server');
const Models = require('../models');

describe('Testing login api', () => {
  beforeAll((done) => {
    Models.users.create({
      username: 'firstUser',
      latestScore: 7,
    }).then(() => { done(); });
  });
  afterAll((done) => {
    Models.users.destroy({
      truncate: true,
      restartIdentity: true,
    }).then(() => { done(); });
  });


  it('Testing for new user', (done) => {
    const options = {
      url: '/login',
      method: 'POST',
      payload: {
        username: 'secondUser',
      },
    };
    server.inject(options, (response) => {
      expect(response.payload).toMatch('Created');
      done();
    });
  });


  it('Testing for existing user', (done) => {
    const options = {
      url: '/login',
      method: 'POST',
      payload: {
        username: 'firstUser',
      },
    };
    server.inject(options, (response) => {
      expect(response.payload).toMatch('Logged in');
      done();
    });
  });
});

