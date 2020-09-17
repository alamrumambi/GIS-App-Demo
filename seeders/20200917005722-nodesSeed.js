'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Nodes', [
      {
        name: 'Stasiun Gedebage',
        type: 'Stasiun',
        latitude: -6.940764911891852,
        longitude: 107.68961000165677,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Grand Cordela Hotel',
        type: 'Hotel',
        latitude: -6.937058623865441,
        longitude: 107.68797842961438,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rumah Sakit Santosa',
        type: 'Rumah Sakit',
        latitude: -6.915414065225376,
        longitude: 107.60040722390498,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'RSPAD Gatot Subroto',
        type: 'Rumah Sakit',
        latitude: -6.176762415982729,
        longitude: 106.83694624748824,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'RS Brawijaya',
        type: 'Rumah Sakit',
        latitude: -7.297295202930516,
        longitude: 112.72279870335308,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    /**
     * Add seed commands here.
     *
     * Example:
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Nodes', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
  }
};
