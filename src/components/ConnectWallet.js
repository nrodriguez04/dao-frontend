// src/components/ConnectWallet.js
import React, { useState } from 'react';
import { connectWallet } from '../services/blockchain';

const ConnectWallet = ({ setSigner, setProvider }) => {
    const [walletConnected, setWalletConnected] = useState(false);

    const connect = async () => {
        const { provider, signer } = await connectWallet();
        if (provider && signer) {
            setSigner(signer);
            setProvider(provider);
            setWalletConnected(true);
        }
    };

    return (
        <div>
            {!walletConnected ? (
                <button onClick={connect}>Connect Wallet</button>
            ) : (
                <p>Wallet Connected</p>
            )}
        </div>
    );
};

export default ConnectWallet;
