'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
        'TURISTSPOTPICTURES',
        'originalname',
        {
            type: Sequelize.STRING,
            allowNull: false,
        }
    );
    await queryInterface.addColumn(
        'TURISTSPOTPICTURES',
        'filename',
        {
            type: Sequelize.STRING,
            allowNull: false,
        }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
        'TURISTSPOTPICTURES',
        'filename'
    );
    await queryInterface.removeColumn(
        'TURISTSPOTPICTURES',
        'originalname'
    );
  }
};
