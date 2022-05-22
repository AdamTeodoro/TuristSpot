'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.changeColumn('KEYS', 'email', {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            primaryKey: false
        });
    },

    async down (queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
         await queryInterface.dropTable('KEYS');
    }
};
