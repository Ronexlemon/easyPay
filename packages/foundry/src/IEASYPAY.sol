// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

library GenerateLinkID{

    function generateId(address _creator, uint256 time)public pure returns(bytes32){
        return (keccak256(abi.encodePacked(_creator,time)));
    }

    
} 