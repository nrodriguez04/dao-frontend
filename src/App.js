// src/App.js
import React, { useState } from 'react';
import ConnectWallet from './components/ConnectWallet';
import Proposals from './components/Proposals';
import CreateProposal from './components/CreateProposal';
import VoteOnProposal from './components/VoteOnProposal';
import ExecuteProposal from './components/ExecuteProposal';
import { getContract } from './services/blockchain';
import VotingContractABI from './contracts/Voting.json'; // Assuming you have the ABI

const App = () => {
    const [signer, setSigner] = useState(null);
    const [votingContract, setVotingContract] = useState(null);

    const handleContractSetup = async (signer) => {
        const votingContractAddress = 'your_voting_contract_address'; // Replace with your actual deployed address
        const contract = getContract(votingContractAddress, VotingContractABI.abi, signer);
        setVotingContract(contract);
    };

    return (
        <div>
            <ConnectWallet setSigner={setSigner} />
            {signer && votingContract && (
                <>
                    <Proposals votingContract={votingContract} />
                    <CreateProposal votingContract={votingContract} />
                    <VoteOnProposal votingContract={votingContract} />
                    <ExecuteProposal votingContract={votingContract} />
                </>
            )}
            {signer && !votingContract && (
                <button onClick={() => handleContractSetup(signer)}>Load Voting Contract</button>
            )}
        </div>
    );
};

export default App;

