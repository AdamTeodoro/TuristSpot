'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
        'TURISTSPOTPICTURES',
        'originalname',
        {
            type: Sequelize.STRING,
            allowNull: true,
        }
    );
    await queryInterface.changeColumn(
        'TURISTSPOTPICTURES',
        'filename',
        {
            type: Sequelize.STRING,
            allowNull: true,
        }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
        'TURISTSPOTPICTURES',
        'originalname',
        {
            type: Sequelize.STRING,
            allowNull: false,
        }
    );
    await queryInterface.changeColumn(
        'TURISTSPOTPICTURES',
        'filename',
        {
            type: Sequelize.STRING,
            allowNull: false,
        }
    )
  }
};
