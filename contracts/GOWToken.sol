pragma solidity ^0.4.2;

contract GOWToken {
    // Constructor
    // Set the total number of tokens
    // Read the total number of tokens
    uint256 public totalSupply;
    string public name;
    string public symbol;
    string public standard;

    mapping(address => uint256) public balanceOf;
    //allowance
    mapping(address => mapping(address=>uint256)) public allowance;

    //approve event
    //event is kind of a broadcast
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );


    constructor(uint256 _initialSupply, string _name, string _symbol) public {
        totalSupply = _initialSupply;
        name = _name;
        symbol = _symbol;
        standard = "V 1.0";
        //allocate the initial supply to the owner's address
        balanceOf[msg.sender] = _initialSupply;
    }

    //Transfer
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        //Transfer the balnce
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    //Exception if acc doesn't have enough 
    //Return a boolean
    //Transfer event
    }

    // approve
    function  approve(address _spender, uint256 _value) public returns (bool success){
        //allowance
        allowance[msg.sender][_spender] = _value;
        //approval
        emit Approval(msg.sender,_spender,_value);
        return true;
    }

    // transferFrom
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        // Require _from has enough tokens
        require(_value <= balanceOf[_from]);
        // Require allowance is big enough
        require(_value <= allowance[_from][msg.sender]);
        // Change teh balance
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        // Update the allowance
        allowance[_from][msg.sender] -= _value;
        // Transfer event
        emit Transfer(_from, _to, _value);
        // Return a boolean
        return true;
    }
}