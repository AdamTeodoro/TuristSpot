'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('ADMINS', { 
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            reference: {
                key: "id",
                model: "User",
            }
        }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ADMINS');
  }
};
