'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
        'TURISTSPOTSPICTURES',
        'imgURL'
    );
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
