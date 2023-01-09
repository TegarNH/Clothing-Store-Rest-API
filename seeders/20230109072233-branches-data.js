const branchesData = require('../masterdata/branch.json');

module.exports = {
  async up(queryInterface) {
    const dataBranchesToBeSeeded = branchesData.map((eachBranchData) => ({
      name: eachBranchData.name,
      address: eachBranchData.address,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Branches', dataBranchesToBeSeeded, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Branches', null, { truncate: true, restartIdentity: true });
  },
};
