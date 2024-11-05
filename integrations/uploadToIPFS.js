// uploadToIPFS.js
import { createHelia } from 'helia';
import { json } from '@helia/json';
import { ethers } from 'ethers';

async function uploadToIPFS(data) {
  const helia = await createHelia();
  const j = json(helia);

  // Add data to IPFS and get CID
  const cid = await j.add(data);
  console.log('Stored CID:', cid.toString());

  // Ethereum smart contract integration
  const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_URL');
  const privateKey = 'YOUR_PRIVATE_KEY'; // Use environment variables for security
  const wallet = new ethers.Wallet(privateKey, provider);

  // Contract address and ABI
  const contractAddress = 'YOUR_CONTRACT_ADDRESS';
  const contractABI = [
    'function setCID(string memory _cid) public',
    'function getCID() public view returns (string memory)'
  ];

  // Create contract instance and send transaction
  const contract = new ethers.Contract(contractAddress, contractABI, wallet);
  const tx = await contract.setCID(cid.toString());
  await tx.wait();
  console.log('Transaction completed:', tx.hash);

  // Close the Helia node when done
  await helia.stop();
}

// Example usage
uploadToIPFS({ message: 'Data for my smart contract' }).catch(console.error);
