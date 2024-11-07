// Initialize web3 and contractInstance here, like you've done in your HTML

async function assignRole(role) {
    try {
        await contractInstance.methods.assignRole(role).send({ from: account });
        console.log(`Role assigned as ${role}`);

        // Log the event data to backend
        const logData = {
            account,
            role,
            timestamp: new Date().toISOString()
        };

        // Send log data to backend for IPFS upload
        await fetch('/upload-ipfs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(logData)
        });
    } catch (error) {
        console.error("Error assigning role:", error.message);
    }
}
