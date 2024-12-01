import React from "react";

const ConnectWallet = ({ onConnect }) => {
    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                alert("MetaMask not detected. Please install it.");
                console.error("MetaMask not detected in the browser.");
                return;
            }

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            console.log("Connected account:", accounts[0]);
            if (onConnect && typeof onConnect === "function") {
                onConnect();
            } else {
                console.error("onConnect is not a function or undefined.");
            }
        } catch (err) {
            if (err.code === 4001) {
                alert("Connection request denied by the user.");
            } else {
                console.error("Error connecting to MetaMask:", err);
                alert("Failed to connect wallet. Check console for details.");
            }
        }
    };

    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
        </div>
    );
};

export default ConnectWallet;
