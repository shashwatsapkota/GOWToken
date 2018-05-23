pragma solidity ^0.4.2;

import "./GOWToken.sol";

contract GOWTokenSale{
    
    address admin;
    GOWToken public tokenContract;
    uint256 public tokenPrice;
   
    constructor (GOWToken _tokenContract, uint256 _tokenPrice) public {
        // Assign an admin
        admin = msg.sender;
        // Token Contract
        tokenContract = _tokenContract;
        // Token Price
        tokenPrice = _tokenPrice;
    }

}