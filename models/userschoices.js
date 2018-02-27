'use strict';
module.exports = (sequelize, DataTypes) => {
  var usersChoices = sequelize.define('usersChoices', {
    username: DataTypes.STRING,
    questionId: DataTypes.INTEGER,
    choice: DataTypes.STRING
  }, {});
  usersChoices.associate = function(models) {
    // associations can be defined here
  };
  return usersChoices;
};