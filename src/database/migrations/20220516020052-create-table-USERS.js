'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('USERS', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        fullName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
},

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    }
};
