'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('TURISTSPOTS', { 
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        idAdmin: {
            type: Sequelize.INTEGER,
            allowNull: false,
            reference: {
                key: 'id',
                model: 'Admin'
            }
        },
        average: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        totalVisitsReceived: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        history: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        city: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        postalCode: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('TURISTSPOTS');
  }
};
