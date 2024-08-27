// src/App.js
import React, { useState } from 'react';
import './App.css'; // Ensure you import the CSS file
import ConnectWallet from './components/ConnectWallet';
import Proposals from './components/Proposals';
import CreateProposal from './components/CreateProposal';
import VoteOnProposal from './components/VoteOnProposal';
import ExecuteProposal from './components/ExecuteProposal';
import { getContract } from './services/blockchain';
import VotingContractABI from './contracts/Voting.json';

const App = () => {
    const [signer, setSigner] = useState(null);
    const [votingContract, setVotingContract] = useState(null);

    const handleContractSetup = async (signer) => {
        const votingContractAddress = '0xe1511260547Cb5Fe4193e3E5f08067387Fa9B7DB';
        const contract = getContract(votingContractAddress, VotingContractABI.abi, signer);
        setVotingContract(contract);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>DAO Voting Platform</h1>
                <ConnectWallet setSigner={setSigner} />
                {signer && votingContract && (
                    <div className="content">
                        <Proposals votingContract={votingContract} />
                        <CreateProposal votingContract={votingContract} />
                        <VoteOnProposal votingContract={votingContract} />
                        <ExecuteProposal votingContract={votingContract} />
                    </div>
                )}
                {signer && !votingContract && (
                    <button onClick={() => handleContractSetup(signer)}>
                        Load Voting Contract
                    </button>
                )}
            </header>
        </div>
    );
};

export default App;
