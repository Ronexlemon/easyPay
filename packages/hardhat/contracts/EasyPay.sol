// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./IEASYPAY.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
error alreadyCashOut();

contract EASYPAY {

    using GenerateLinkID for address;
    IERC20 public cusdToken;

    struct easylink {
        bytes32 easylink;
        bool isPaid;
        uint256 amount;
    }

    // Events
    event LinkGenerated(address indexed creator, bytes32 link, uint256 amount);
    event PaymentClaimed(address indexed claimant, bytes32 link, uint256 amount);

    constructor(address _addr) {
        cusdToken = IERC20(_addr);
    }

    mapping(bytes32 => easylink) public _easylinks;

    function generateLink(uint256 _amount) public returns (bytes32) {
        bytes32 newlink = msg.sender.generateId(block.timestamp);
        _easylinks[newlink] = easylink({
            easylink: newlink,
            isPaid: false,
            amount: _amount
        });
        require(cusdToken.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        // Emit event for link generation
        emit LinkGenerated(msg.sender, newlink, _amount);

        return newlink;
    }

    function claim(bytes32 _code) public returns (bool) {
        if (_easylinks[_code].isPaid) {
            revert alreadyCashOut();
        }

        require(cusdToken.transfer(msg.sender, _easylinks[_code].amount), "Transfer failed");
        _easylinks[_code].isPaid = true;

        // Emit event for payment claim
        emit PaymentClaimed(msg.sender, _code, _easylinks[_code].amount);

        return true;
    }
}
