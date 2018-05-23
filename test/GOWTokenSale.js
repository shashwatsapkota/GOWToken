var GOWTokenSale = artifacts.require("./GOWTokenSale.sol")

contract('GOWTokenSale', function(accounts){
    var tokenSaleInstace;
    var tokenPrice = 1000000000000000;

    it('initializes the contract with the correct values',function(){
        return GOWTokenSale.deployed().then(function(instance){
            tokenSaleInstace=instance;
            return tokenSaleInstace.address;
        }).then(function(address){
            assert.notEqual(address,0x0, 'has contract address');
            return tokenSaleInstace.tokenContract();
        }).then(function(address){
            assert.notEqual(address,0x0, 'has token contract adddress');
            return tokenSaleInstace.tokenPrice();
        }).then(function(price){
            assert.equal(price,tokenPrice, 'token price is correct');
        });
    });
});