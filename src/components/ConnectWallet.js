import React, { useState } from 'react';
import { connectWallet } from '../services/blockchain';

const ConnectWallet = ({ setSigner, setProvider }) => {
    const [walletConnected, setWalletConnected] = useState(false);
    const [walletAddress, setWalletAddress] = useState('');

    const connect = async () => {
        const connection = await connectWallet();
        if (connection) {
            setSigner(connection.signer);
            setProvider(connection.provider);
            const address = await connection.signer.getAddress();
            setWalletAddress(address);
            setWalletConnected(true);
        }
    };

    return (
        <div>
            {!walletConnected ? (
                <button onClick={connect}>Connect Wallet</button>
            ) : (
                <p>Connected: {walletAddress}</p>
            )}
        </div>
    );
};

export default ConnectWallet;
