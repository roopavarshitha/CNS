import React, { useState } from "react";
import ConnectWallet from "./ConnectWallet";

const HomePage = ({ navigateToMenu }) => {
    const [isWalletConnected, setWalletConnected] = useState(false);

    const handleWalletConnect = () => {
        setWalletConnected(true);
        navigateToMenu();
    };

    return (
        <div>
            <h1>Welcome to Decentralized Identity Management</h1>
            <p>Please connect your wallet to continue.</p>
            {!isWalletConnected && <ConnectWallet onConnect={handleWalletConnect} />}
        </div>
    );
};

export default HomePage;
