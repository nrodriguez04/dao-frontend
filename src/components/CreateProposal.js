// src/components/CreateProposal.js
import React, { useState } from 'react';
import { createProposal } from '../services/blockchain';

const CreateProposal = ({ votingContract }) => {
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createProposal(votingContract, description);
        setDescription('');
    };

    return (
        <div>
            <h2>Create Proposal</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Proposal Description"
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateProposal;
