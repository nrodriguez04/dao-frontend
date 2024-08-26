// src/components/VoteOnProposal.js
import React, { useState } from 'react';
import { voteOnProposal } from '../services/blockchain';

const VoteOnProposal = ({ votingContract }) => {
    const [proposalId, setProposalId] = useState('');

    const handleVote = async () => {
        await voteOnProposal(votingContract, proposalId);
        setProposalId('');
    };

    return (
        <div>
            <h2>Vote on Proposal</h2>
            <input
                type="text"
                value={proposalId}
                onChange={(e) => setProposalId(e.target.value)}
                placeholder="Proposal ID"
            />
            <button onClick={handleVote}>Vote</button>
        </div>
    );
};

export default VoteOnProposal;
