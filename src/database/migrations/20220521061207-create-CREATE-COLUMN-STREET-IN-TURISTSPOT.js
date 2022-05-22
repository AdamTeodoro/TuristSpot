'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
        'TURISTSPOTS',
        'street',
        {
            type: Sequelize.STRING,
            allowNull: false,
        }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
        'TURISTSPOTS',
        'street'
    )
  }
};
