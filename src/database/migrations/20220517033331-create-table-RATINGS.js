'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('RATINGS', { 
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        idSimpleUser: {
            type: Sequelize.INTEGER,
            allowNull: false,
            reference: {
                key: 'id',
                model: 'SimpleUser'
            }
        },
        idTuristSpot: {
            type: Sequelize.INTEGER,
            allowNull: false,
            reference: {
                key: 'id',
                model: 'TuristSpot'
            }
        },
        imgURL: {
            type: Sequelize.TEXT,
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
