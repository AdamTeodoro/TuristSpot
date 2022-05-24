'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
        'PERMISSIONS',
        'token'
    );
    await queryInterface.addColumn(
        'PERMISSIONS',
        'permissionHash',
        {
            type: Sequelize.STRING,
            allowNull: false,
        }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
        'PERMISSIONS',
        'token'
    );
    await queryInterface.addColumn(
        'PERMISSIONS',
        'permissionHash',
        {
            type: Sequelize.STRING,
            allowNull: false,
        }
    )
  }
};
