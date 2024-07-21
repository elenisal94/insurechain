import { ethers } from 'ethers';
import { contractAddress, contractABI } from './config';

const getContract = () => {
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(contractAddress, contractABI, signer);
    } else {
        throw new Error('Ethereum wallet is not installed');
    }
};

export default getContract;
