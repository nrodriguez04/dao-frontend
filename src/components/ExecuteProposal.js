// src/components/ExecuteProposal.js
import React, { useState } from 'react';
import { executeProposal } from '../services/blockchain';

const ExecuteProposal = ({ votingContract }) => {
    const [proposalId, setProposalId] = useState('');

    const handleExecute = async () => {
        await executeProposal(votingContract, proposalId);
        setProposalId('');
    };

    return (
        <div>
            <h2>Execute Proposal</h2>
            <input
                type="text"
                value={proposalId}
                onChange={(e) => setProposalId(e.target.value)}
                placeholder="Proposal ID"
            />
            <button onClick={handleExecute}>Execute</button>
        </div>
    );
};

export default ExecuteProposal;
