import React, { useState } from "react";
import { uploadToIPFS } from "../../backend/ipfs";
import { ethers } from "ethers";
import contractABI from "../utils/contractABI.json"; // Import your ABI

const User = () => {
    const [details, setDetails] = useState({ name: "", email: "" });

    const handleSubmit = async () => {
        try {
            const ipfsHash = await uploadToIPFS(details); // Pin JSON data to Pinata
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                "YOUR_CONTRACT_ADDRESS", // Replace with your deployed contract address
                contractABI,
                signer
            );

            await contract.registerUser(ipfsHash, "user");
            alert("Details submitted successfully!");
        } catch (err) {
            console.error("Error submitting details:", err);
            alert("Failed to submit details.");
        }
    };

    return (
        <div>
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
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default User;
