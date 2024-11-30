// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract IdentityContract {
    struct User {
        uint256 id;
        address publicKey;
        string ipfsHash;
        string role; // "user" or "requester"
    }

    mapping(address => User) public users;
    uint256 private userCounter;

    event UserRegistered(uint256 indexed id, address indexed publicKey, string ipfsHash, string role);

    function registerUser(string memory _ipfsHash, string memory _role) public {
        require(users[msg.sender].id == 0, "User already registered");
        require(
            keccak256(abi.encodePacked(_role)) == keccak256(abi.encodePacked("user")) ||
            keccak256(abi.encodePacked(_role)) == keccak256(abi.encodePacked("requester")),
            "Invalid role"
        );

        userCounter++;
        users[msg.sender] = User({
            id: userCounter,
            publicKey: msg.sender,
            ipfsHash: _ipfsHash,
            role: _role
        });

        emit UserRegistered(userCounter, msg.sender, _ipfsHash, _role);
    }

    function getMyDetails() public view returns (uint256, address, string memory, string memory) {
        require(users[msg.sender].id != 0, "User not registered");
        User memory user = users[msg.sender];
        return (user.id, user.publicKey, user.ipfsHash, user.role);
    }

    function getOtherUserDetails(address _userAddress) public view returns (uint256, address, string memory, string memory) {
        require(users[msg.sender].id != 0, "Requester not registered");
        require(
            keccak256(abi.encodePacked(users[msg.sender].role)) == keccak256(abi.encodePacked("requester")),
            "Access denied: Only requesters can access other user details"
        );
        require(users[_userAddress].id != 0, "User does not exist");

        User memory user = users[_userAddress];
        return (user.id, user.publicKey, user.ipfsHash, user.role);
    }
}
