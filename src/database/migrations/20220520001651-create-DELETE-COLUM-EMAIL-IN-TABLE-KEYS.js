'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.dropTable('KEYS');
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
            references: {
                model: "USERS",
                key: 'email',
            },
            unique: true
        },

        passwordHash: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
    });
  },

  async down (queryInterface, Sequelize) {

  }
};
