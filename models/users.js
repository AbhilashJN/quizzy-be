

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    latestScore: DataTypes.INTEGER,
  }, {});
  users.associate = function (models) {
    // associations can be defined here
  };
  return users;
};
