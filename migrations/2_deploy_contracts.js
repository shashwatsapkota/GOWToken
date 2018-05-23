var GOWToken = artifacts.require("./GOWToken.sol");

module.exports = function(deployer) {
  deployer.deploy(GOWToken, 1000000,'GOW Token','GOW');
};
