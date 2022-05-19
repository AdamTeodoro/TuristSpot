'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('KEYS', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                key: 'id',
                model: 'USERS'
            }
        },

        email: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
            references: {
                model: "USERS",
                key: 'email',
            }
        },

        passwordHash: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('KEYS');
  }
};
