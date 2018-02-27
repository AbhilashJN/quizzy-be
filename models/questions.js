'use strict';
module.exports = (sequelize, DataTypes) => {
  var questions = sequelize.define('questions', {
    questionId: DataTypes.INTEGER,
    question: DataTypes.STRING,
    answer: DataTypes.STRING
  }, {});
  questions.associate = function(models) {
    // associations can be defined here
  };
  return questions;
};