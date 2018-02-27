const server = require('../src/server');
const Models = require('../models');

const testArray = [{ username: 'ghj', latestScore: 2 }, { username: 'user1', latestScore: 7 }, { username: 'rty', latestScore: 3 }, { username: 'asd', latestScore: 11 }, { username: 'sa', latestScore: 0 }];


describe('testing the getTopFive route', () => {
  beforeAll((done) => {
    Models.users.destroy({ truncate: true, restartIdentity: true })
      .then(() => {
        Models.users.bulkCreate(testArray)
          .then(() => { done(); });
      });
  });


  afterAll((done) => {
    Models.users.destroy({ truncate: true, restartIdentity: true })
      .then(() => { done(); });
  });


  it('Testing the response of the api', (done) => {
    const options = {
      method: 'GET',
      url: '/getTopFive',
    };
    server.inject(options, (response) => {
      expect(JSON.parse(response.payload)).toEqual([{ username: 'asd', latestScore: 11 }, { username: 'user1', latestScore: 7 }, { username: 'rty', latestScore: 3 }, { username: 'ghj', latestScore: 2 }, { username: 'sa', latestScore: 0 }]);
      done();
    });
  });
});
