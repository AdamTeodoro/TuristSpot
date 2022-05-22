'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
        'TURISTSPOTPICTURES',
        'imgURL'
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * 
     */
    await queryInterface.removeColumn(
        'TURISTSPOTPICTURES',
        'imgURL'
    );
  }
};
