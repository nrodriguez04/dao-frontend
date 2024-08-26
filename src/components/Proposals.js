// src/components/Proposals.js
import React, { useEffect, useState } from 'react';
import { fetchProposals } from '../services/blockchain';

const Proposals = ({ votingContract }) => {
    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        const getProposals = async () => {
            const proposals = await fetchProposals(votingContract);
            setProposals(proposals);
        };
        getProposals();
    }, [votingContract]);

    return (
        <div>
            <h2>Proposals</h2>
            <ul>
                {proposals.map((proposal, index) => (
                    <li key={index}>
                        <p>ID: {proposal.id.toString()}</p>
                        <p>Description: {proposal.description}</p>
                        <p>Votes: {proposal.voteCount.toString()}</p>
                        <p>Executed: {proposal.executed ? 'Yes' : 'No'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Proposals;
