const server = require('../src/server');
const Models = require('../models');

describe('Testing login api', () => {
  beforeAll((done) => {
    Models.users.bulkCreate([{
      username: 'firstUser',
      latestScore: 7,
    },
    {
      username: 'secondUser',
      latestScore: 0,
    },
    ]).then(() => {
      done();
    });
  });
  afterAll((done) => {
    Models.users.destroy({
      truncate: true,
      restartIdentity: true,
    }).then(() => { Models.usersChoices.destroy({ truncate: true, restartIdentity: true }).then(() => { done(); }); });
  });


  it('Testing for new user', (done) => {
    const options = {
      url: '/login',
      method: 'POST',
      payload: {
        username: 'thirdUser',
      },
    };
    server.inject(options, (response) => {
      const expectedObj = { username: 'thirdUser', latestScore: 0, choices: [] };
      expect(response.result).toEqual(expectedObj);
      done();
    });
  });


  it('Testing for existing user with multiple choices saved', (done) => {
    const options = {
      url: '/login',
      method: 'POST',
      payload: {
        username: 'firstUser',
      },
    };
    Models.usersChoices.bulkCreate([
      {
        username: 'firstUser',
        questionId: 1,
        choice: 'firstchoice',
      },
      {
        username: 'firstUser',
        questionId: 2,
        choice: 'secondchoice',
      },
      {
        username: 'firstUser',
        questionId: 3,
        choice: 'thirdchoice',
      },
      {
        username: 'firstUser',
        questionId: 4,
        choice: 'firstchoice',
      },
      {
        username: 'firstUser',
        questionId: 5,
        choice: 'fourthchoice',
      },
      {
        username: 'firstUser',
        questionId: 6,
        choice: 'thirdchoice',
      },
      {
        username: 'firstUser',
        questionId: 7,
        choice: 'firstchoice',
      },
      {
        username: 'firstUser',
        questionId: 8,
        choice: 'secondchoice',
      },
    ]).then(() => {
      server.inject(options, (response) => {
        const expectedObj = {
          username: 'firstUser',
          latestScore: 7,
          choices: [
            {
              questionId: 1,
              choice: 'firstchoice',
            },
            {
              questionId: 2,
              choice: 'secondchoice',
            },
            {
              questionId: 3,
              choice: 'thirdchoice',
            },
            {
              questionId: 4,
              choice: 'firstchoice',
            },
            {
              questionId: 5,
              choice: 'fourthchoice',
            },
            {
              questionId: 6,
              choice: 'thirdchoice',
            },
            {
              questionId: 7,
              choice: 'firstchoice',
            },
            {
              questionId: 8,
              choice: 'secondchoice',
            },
          ],
        };
        expect(response.result).toEqual(expectedObj);
        done();
      });
    });
  });

  it('Testing for existing user with 0 choices saved', (done) => {
    const options = {
      url: '/login',
      method: 'POST',
      payload: {
        username: 'secondUser',
      },
    };
    server.inject(options, (response) => {
      const expectedObj = { username: 'secondUser', latestScore: 0, choices: [] };
      expect(response.result).toEqual(expectedObj);
      done();
    });
  });
});

