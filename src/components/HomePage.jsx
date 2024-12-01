import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import ConnectWallet from "./ConnectWallet";

const HomePage = () => {
    const [isWalletConnected, setWalletConnected] = useState(false);
    const navigate = useNavigate(); // Initialize the navigation function

    const handleWalletConnect = () => {
        console.log("Wallet connected successfully!");
        setWalletConnected(true);
        navigate("/menu"); // Navigate to the menu page
    };

    return (
        <div>
            <h1>Welcome to Decentralized Identity Management</h1>
            <p>Please connect your wallet to continue.</p>
            {!isWalletConnected ? (
                <ConnectWallet onConnect={handleWalletConnect} />
            ) : (
                <p>Wallet connected! Proceed to the menu.</p>
            )}
        </div>
    );
};

export default HomePage;
