'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('RATINGPICTURES', { 
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        idRating: {
            type: Sequelize.INTEGER,
            allowNull: false,
            reference: {
                key: 'id',
                model: 'TuristSpot'
            }
        },
        idUser: {
            type: Sequelize.INTEGER,
            allowNull: false,
            reference: {
                key: 'id',
                model: 'Admin'
            }
        },
        qtdImages: {
            type: Sequelize.INTEGER,
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
     await queryInterface.dropTable('RATINGPICTURES');
  }
};
