'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.createTable('TURISTSPOTPICTURES', { 
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            idTuristSpot: {
                type: Sequelize.INTEGER,
                allowNull: false,
                reference: {
                    key: 'id',
                    model: 'TuristSpot'
                }
            },
            idAdmin: {
                type: Sequelize.INTEGER,
                allowNull: false,
                reference: {
                    key: 'id',
                    model: 'Admin'
                }
            },
            imgURL: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.dropTable('TURISTSPOTPICTURES');
    }
};
