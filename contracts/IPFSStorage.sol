// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract IPFSStorage {
    string public ipfsCid;

    // Function to store the CID
    function setCID(string memory _cid) public {
        ipfsCid = _cid;
    }

    // Function to get the CID
    function getCID() public view returns (string memory) {
        return ipfsCid;
    }
}
