// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

// Import necessary libraries and contracts
import { IdentityContract } from "../contracts/IdentityContract.sol";  // Correct path to IdentityContract.sol
// import { Script } from "forge-std/src/Script";  // Import Script for deploying
// import "forge-std/console.sol";
// import "forge-std/Script";
import "lib/forge-std/src/Script.sol";

contract DeployIdentityContract is Script {

    // The run function is required for the script to execute
    function run() public {
        // uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");  // Load private key from environment
       uint256 deployerPrivateKey = 0x74fa6d16f6870a9cf4fc6df5f0fe01180239c58379fdb3e7c5aee9415fe9740d; // No quotes, and prefixed with 0x

        vm.startBroadcast(deployerPrivateKey);

        // Deploy the IdentityContract
        IdentityContract identityContract = new IdentityContract();

        // Stop broadcasting after the deployment
        vm.stopBroadcast();

        // Log the deployed contract address
        console.log("IdentityContract deployed to:", address(identityContract));
    }
}
