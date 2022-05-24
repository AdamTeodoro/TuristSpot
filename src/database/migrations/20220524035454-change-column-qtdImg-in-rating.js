'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
        'RATINGS',
        'qtdImg'
    );
    await queryInterface.addColumn(
        'RATINGS',
        'qtdImg',
        {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
        'RATINGS',
        'qtdImg'
    );
    await queryInterface.addColumn(
        'RATINGS',
        'qtdImg',
        {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    )
  }
};
