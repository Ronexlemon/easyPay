// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Counter {
    uint256 public number;

    function setNumber(uint256 newNumber) public {
        number = newNumber;
    }

    function increment() public {
        number++;
    }
}


//forge  create --rpc-url wss://alfajores-forno.celo-testnet.org/ws        --constructor-args 0x874069fa1eb16d44d622f2e0ca25eea172369bc1 --etherscan-api-key FTW6GVGU5EQYWN6D7NHEJS13F845D6CWSZ --private-key privatekey    --verify  src/EasyPay.sol:EASYPAY
