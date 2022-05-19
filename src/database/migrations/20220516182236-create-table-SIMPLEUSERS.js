'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('SIMPLEUSERS', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            reference: {
                key: "id",
                model: "User",
            }
        },
        isActive: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('SIMPLEUSERS');
  }
};
