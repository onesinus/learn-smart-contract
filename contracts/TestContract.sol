// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TestContract {
    uint public storedData;

    event Deployed(uint value);

    constructor() {
        storedData = 100;
        emit Deployed(storedData); // Debugging event to verify constructor is running
    }

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}