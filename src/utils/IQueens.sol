// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "./IERC721Enumerable.sol";

interface IQueens is IERC721Enumerable {
    function isMintedBeforeReveal(uint256 index) external view returns (bool);
}
