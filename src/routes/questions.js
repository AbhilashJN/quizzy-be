
const helpers = require('./helpers.js');
const Models = require('../../models');


const groupByQuesId = (optsArr) => {
  console.log(optsArr);
  const optsGroupedByQuesId = optsArr.reduce((acc, current) => {
    acc[current.questionId] = acc[current.questionId] || [];
    acc[current.questionId].push(current.option);
    return acc;
  }, {});
  console.log('i:::::::', optsGroupedByQuesId);
  return optsGroupedByQuesId;
};


const mergeOptsWithQues = (allQuesArray, optsObj) => {
  const quesWithOpts = allQuesArray.map((ques, index) => {
    const newQues = { ...ques };
    newQues.opts = optsObj[ques.questionId];
    return newQues;
  });
  return quesWithOpts;
};


module.exports = [


  {
    path: '/questions',
    method: 'GET',
    handler: (request, response) => {
      const resultPromise = helpers.getQuestionsWithAnswers();
      resultPromise.then((quesWithAns) => {
        const quesArr = [];
        const optsArr = [];
        quesWithAns.map((ques) => {
          const keys = Object.keys(ques);
          const currQues = { questionId: ques.questionId, question: ques.question, answer: ques.answer };
          quesArr.push(currQues);
          keys.forEach((element) => {
            if (element === 'question' || element === 'questionId' || element === 'answer') {
              //
            } else {
              optsArr.push({ questionId: ques.questionId, option: ques[element] });
            }
          });
        });

        Models.questions.bulkCreate(quesArr).then(() => {
          Models.options.bulkCreate(optsArr).then(response('saved to db'));
        });
      });
    },
  },


  {
    path: '/readquestions',
    method: 'GET',
    handler: (request, response) => {
      Models.questions.findAndCountAll({ attributes: ['questionId', 'question', 'answer'] })
        .then(values => values.rows)
        .then((rows) => {
          const dbQuesArray = rows.map(ques => ques.dataValues);
          return dbQuesArray;
        }).then((dbQuesArray) => {
          Models.options.findAndCountAll({ attributes: ['questionId', 'option'] })
            .then(values => values.rows)
            .then((rows) => {
              const dboptsArray = rows.map(option => option.dataValues);
              return dboptsArray;
            })
            .then((dboptsArray) => {
              const optsObj = groupByQuesId(dboptsArray);
              const merged = mergeOptsWithQues(dbQuesArray, optsObj);
              response(merged);
            });
        });
    },
  },


];
