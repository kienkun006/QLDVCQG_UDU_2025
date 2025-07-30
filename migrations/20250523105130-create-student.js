'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      msv: {
        type: Sequelize.STRING,
        //rang buoc khong duowc trung nhau
        allowNull: false,
        uinque: true
      },
      name: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATE
      },
      class: {
        type: Sequelize.STRING
      },
      score: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('students');
  }
};