

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('usersChoices', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    username: {
      type: Sequelize.STRING,
      unique: 'compositeIndex',
    },
    questionId: {
      type: Sequelize.INTEGER,
      unique: 'compositeIndex',
    },
    choice: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('usersChoices'),
};
