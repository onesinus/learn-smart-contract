// backend/uploadToIPFS.js
import {} from 'dotenv/config';
import { createHelia } from 'helia';
import { json } from '@helia/json';
import { CID } from 'multiformats/cid';
import { unixfs } from '@helia/unixfs';

import express from 'express';
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS to allow frontend requests

// Initialize Helia (global instance for reuse)
let helia;
let fs;

async function initializeHelia() {
    helia = await createHelia();
    fs = unixfs(helia);
}
initializeHelia();

// IPFS upload function
async function uploadToIPFS(data) {
    const j = json(helia);

    // Add data to IPFS and get CID
    const cid = await j.add(data);
    console.log('Stored CID:', cid.toString());

    // Stop the Helia instance
    await helia.stop();

    return cid.toString();
}

app.get('/', (req, res) => {
    res.status(200).send("Smart contract backend is working...")
})

// POST endpoint to upload data to IPFS
app.post('/upload-ipfs', async (req, res) => {
    try {
        const data = req.body; // Data to upload, received from the frontend
        const buffer = Buffer.from(JSON.stringify(data));
        const cid = await fs.addBytes(buffer);
        
        res.status(200).json({ cid: cid.toString() });
    } catch (error) {
        console.error("Error uploading to IPFS:", error.message);
        res.status(500).json({ error: 'Error uploading to IPFS' });
    }
});

// GET endpoint to retrieve data from IPFS using CID
app.get('/retrieve-ipfs/:cid', async (req, res) => {
    try {
        const { cid } = req.params; // CID from the URL parameter
        const parsedCid = CID.parse(cid); // Parse the CID
        
        let data = '';
        const decoder = new TextDecoder();

        for await (const chunk of fs.cat(parsedCid)) {
            data += decoder.decode(chunk, { stream: true });
        }

        res.status(200).json({ data: JSON.parse(data) }); // Return data as JSON
    } catch (error) {
        console.error("Error retrieving from IPFS:", error.message);
        res.status(500).json({ error: 'Error retrieving from IPFS' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});
