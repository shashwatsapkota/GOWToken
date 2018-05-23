var GOWToken = artifacts.require("./GOWToken.sol");
var GOWTokenSale = artifacts.require("./GOWTokenSale.sol");

module.exports = function(deployer) {
  deployer.deploy(GOWToken, 1000000,'GOW Token','GOW').then(function(){
    return deployer.deploy(GOWTokenSale, GOWToken.address, 1000000000000000);
  });
  
};
