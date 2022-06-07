'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('KEYS', 'email');
    await queryInterface.removeColumn('USERS', 'email');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('KEYS', 'email');
    await queryInterface.removeColumn('USERS', 'email');
  }
};
