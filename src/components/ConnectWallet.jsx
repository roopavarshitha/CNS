import React from "react";

const ConnectWallet = ({ onConnect }) => {
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                onConnect();
                alert("Wallet connected successfully!");
            } catch (err) {
                console.error("Error connecting to MetaMask:", err);
                alert("Failed to connect wallet. Check console for details.");
            }
        } else {
            alert("MetaMask not detected. Please install it.");
        }
    };

    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
        </div>
    );
};

export default ConnectWallet;
