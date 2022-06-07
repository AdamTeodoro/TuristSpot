'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * 
     */
     await queryInterface.addColumn(
        'USERS',
        'email',
        {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn(
        'USERS',
        'email',
        {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        }
    );
  }
};
