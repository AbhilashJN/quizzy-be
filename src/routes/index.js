const questions = require('./questions');
const login = require('./login');
const saveChoice = require('./saveChoice');

module.exports = [].concat(questions, login, saveChoice);

