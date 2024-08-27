import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';

export const connectWallet = async () => {
    const provider = await detectEthereumProvider();

    if (provider) {
        console.log("Ethereum provider detected.");
        try {
            // Request account access if needed
            await provider.request({ method: 'eth_requestAccounts' });
            const web3Provider = new ethers.BrowserProvider(provider); // Use BrowserProvider for a browser environment
            const signer = await web3Provider.getSigner();
            return { provider: web3Provider, signer };
        } catch (error) {
            console.error("User rejected the request.");
            return null;
        }
    } else {
        console.error("Please install MetaMask!");
        return null;
    }
};

export const getContract = (contractAddress, abi, signer) => {
    return new ethers.Contract(contractAddress, abi, signer);
};

export const fetchProposals = async (votingContract) => {
    const proposalCount = await votingContract.proposalCount();
    let proposals = [];
    for (let i = 1; i <= proposalCount; i++) {
        const proposal = await votingContract.proposals(i);
        proposals.push(proposal);
    }
    return proposals;
};

export const createProposal = async (votingContract, description) => {
    const tx = await votingContract.createProposal(description);
    await tx.wait();
};

export const voteOnProposal = async (votingContract, proposalId) => {
    const tx = await votingContract.vote(proposalId);
    await tx.wait();
};

export const executeProposal = async (votingContract, proposalId) => {
    const tx = await votingContract.executeProposal(proposalId);
    await tx.wait();
};
