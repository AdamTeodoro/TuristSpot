'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
        'RATINGS',
        'commentary',
        {
            type: Sequelize.STRING,
            allowNull: false,
        }
    );
    await queryInterface.addColumn(
        'RATINGS',
        'rating',
        {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
        'RATINGS',
        'commentary'
    );
    await queryInterface.removeColumn(
        'RATINGS',
        'rating'
    );
  }
};
