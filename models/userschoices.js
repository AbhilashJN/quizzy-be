

module.exports = (sequelize, DataTypes) => {
  const usersChoices = sequelize.define('usersChoices', {
    username: {
      type: DataTypes.STRING,
      unique: 'compositeIndex',
    },
    questionId: {
      type: DataTypes.INTEGER,
      unique: 'compositeIndex',
    },
    choice: DataTypes.STRING,
  }, {});
  usersChoices.associate = function (models) {
    // associations can be defined here
  };
  return usersChoices;
};
