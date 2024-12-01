import React, { useState } from "react";
import { uploadToIPFS } from "../../backend/ipfs";
import { ethers } from "ethers";
import Identityabi from "../Identityabi.json"; // Ensure this is the correct ABI file

const User = () => {
    const [details, setDetails] = useState({ name: "", email: "" });

    const handleSubmit = async () => {
        if (!window.ethereum) {
            alert("Please install MetaMask to interact with the contract.");
            return;
        }

        try {
            const ipfsHash = await uploadToIPFS(details); // Pin JSON data to IPFS
            if (!ipfsHash) {
                alert("Failed to upload details to IPFS.");
                return;
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const contract = new ethers.Contract(
                "CONTRACT_ADDRESS", // Replace with your deployed contract address
                Identityabi,  // Use the correct ABI
                signer
            );

            // Call the registerUser function in the contract
            const transaction = await contract.registerUser(ipfsHash, "user");
            await transaction.wait();  // Wait for the transaction to be mined

            alert("Details submitted successfully!");
        } catch (err) {
            console.error("Error submitting details:", err);
            alert("Failed to submit details.");
        }
    };

    return (
        <div className="user-container">
            <form className="user">
                <h1>User Details</h1>
                <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setDetails({ ...details, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setDetails({ ...details, email: e.target.value })}
                />
                <button type="button" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default User;
