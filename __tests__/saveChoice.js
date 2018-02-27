const server = require('../src/server');

const Models = require('../models');


describe('Testing the saveChoices route', () => {
  beforeAll((done) => {
    Models.usersChoices.destroy({ truncate: true, restartIdentity: true })
      .then(() => {
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
          done();
        });
      });
  });
  afterAll((done) => {
    Models.usersChoices.destroy({ truncate: true, restartIdentity: true })
      .then(() => { done(); });
  });


  it('Testing for saving new response', (done) => {
    const options = {
      url: '/saveChoice',
      method: 'POST',
      payload: JSON.stringify({
        username: 'firstUser',
        questionId: 11,
        choice: 'thirdchoice',
      }),
    };
    server.inject(options, (response) => {
      expect(response.payload).toMatch('Response Saved');
      done();
    });
  });

  it('Testing for updating response', (done) => {
    const options = {
      url: '/saveChoice',
      method: 'POST',
      payload: JSON.stringify({
        username: 'firstUser',
        questionId: 1,
        choice: 'thirdchoice',
      }),
    };
    server.inject(options, (response) => {
      expect(response.payload).toMatch('Response Updated');
      done();
    });
  });
});

