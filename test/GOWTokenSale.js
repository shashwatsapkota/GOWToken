var GOWTokenSale = artifacts.require("./GOWTokenSale.sol")
var GOWToken = artifacts.require("./GOWToken.sol")

contract('GOWTokenSale', function(accounts){
    var tokenSaleInstace;
    var tokenInstance;
    var buyer = accounts[1];
    var admin = accounts[0];
    var tokensAvailable = 750000;
    var tokenPrice = 1000000000000000;
    var numberOfTokens;
            

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

    it('facilitates token buying', function(){
        return GOWToken.deployed().then(function(instance){
            tokenInstance = instance;
            return GOWTokenSale.deployed();
        }).then(function(instance){
            tokenSaleInstace = instance;
            return tokenInstance.transfer(tokenSaleInstace.address, tokensAvailable, { from: admin });
        }).then(function(receipt){
            numberOfTokens=10;
            var value = numberOfTokens * tokenPrice;
            return tokenSaleInstace.buyTokens(numberOfTokens, { from: buyer, value: value})
        }).then(function(receipt){
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Sell', 'should be the "Sell" event');
            assert.equal(receipt.logs[0].args._buyer, buyer, 'logs the account that purchassed the tokens');
            assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'logs the number of tokens purchased');
            return tokenSaleInstace.tokensSold();
        }).then(function(amount){
            assert.equal(amount.toNumber(), numberOfTokens, 'icrements the number of tokens sold');
            return tokenInstance.balanceOf(buyer);
        }).then(function(balance){
            assert.equal(balance.toNumber(), numberOfTokens)
            return tokenInstance.balanceOf(tokenSaleInstace.address);
        }).then(function(balance){
            assert.equal(balance.toNumber(), tokensAvailable - numberOfTokens, '')
            return tokenSaleInstace.buyTokens(numberOfTokens, { from: buyer, value: 1});
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert')>=0, 'msg.value must euqal numer of tokens in wei')
            return tokenSaleInstace.buyTokens(800000, { from: buyer, value: 1});
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert')>=0, 'cannot transfer more than avaialbale')
        });
    });
});