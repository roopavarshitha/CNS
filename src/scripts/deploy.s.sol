// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

// Import necessary libraries and contracts
import { IdentityContract } from "../contracts/IdentityContract.sol";  // Correct path to IdentityContract.sol
import { Script } from "forge-std/Script";  // Import Script for deploying

contract DeployIdentityContract is Script {

    // The run function is required for the script to execute
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");  // Load private key from environment

        // Start broadcasting the deployment transaction
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the IdentityContract
        IdentityContract identityContract = new IdentityContract();

        // Stop broadcasting after the deployment
        vm.stopBroadcast();

        // Log the deployed contract address
        console.log("IdentityContract deployed to:", address(identityContract));
    }
}
