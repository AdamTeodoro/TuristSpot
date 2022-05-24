'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
        'RATINGS',
        'qtdImg',
        {
            type: Sequelize.STRING,
            allowNull: false,
        }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
        'RATINGS',
        'qtdImg'
    );
  }
};
