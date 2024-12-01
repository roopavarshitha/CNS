import React, { useState } from "react";
import { ethers } from "ethers";
import identityabi from "../Identityabi.json";  // Import with lowercase 'identityabi'

const Requester = () => {
    const [address, setAddress] = useState("");
    const [userDetails, setUserDetails] = useState(null);

    const fetchDetails = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                "CONTRACT_ADDRESS",  // Replace with your deployed contract address
                identityabi,  // Use the imported identityabi here (match the import name)
                signer
            );

            const details = await contract.getOtherUserDetails(address);
            setUserDetails(details);
        } catch (err) {
            console.error("Error fetching details:", err);
            alert("Failed to fetch user details.");
        }
    };

    return (
        <div>
            <h1>Requester</h1>
            <input
                type="text"
                placeholder="Enter User Address"
                onChange={(e) => setAddress(e.target.value)}
            />
            <button onClick={fetchDetails}>Fetch Details</button>
            {userDetails && (
                <div>
                    <p>ID: {userDetails[0]}</p>
                    <p>Address: {userDetails[1]}</p>
                    <p>IPFS Hash: {userDetails[2]}</p>
                    <p>Role: {userDetails[3]}</p>
                </div>
            )}
        </div>
    );
};

export default Requester;
