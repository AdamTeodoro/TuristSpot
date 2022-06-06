'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
        'RATINGPICTURES',
        'qtdImages'
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
        'RATINGPICTURES',
        'qtdImages'
    );
  }
};
