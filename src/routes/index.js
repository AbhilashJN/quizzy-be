const questions = require('./questions');
const login = require('./login');
const saveChoice = require('./saveChoice');
const saveScore = require('./saveScore');
const getTopFive = require('./getTopFive');

module.exports = [].concat(questions, login, saveChoice, saveScore, getTopFive);

