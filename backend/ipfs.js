import axios from "axios";

/**
 * Upload JSON data to Pinata and get the IPFS hash.
 * @param {Object} data - The data to upload as JSON (e.g., { name: "John", email: "john@example.com" }).
 * @returns {Promise<string>} - The IPFS hash of the uploaded data.
 */
export const uploadToIPFS = async (data) => {
    try {
        // Correct Pinata endpoint for JSON data
        const endpoint = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
        
        // Debug logs for API keys
        console.log("Pinata API Key:", import.meta.env.VITE_PINATA_API_KEY);
        console.log("Pinata Secret Key:", import.meta.env.VITE_PINATA_SECRET_API_KEY);

        // Ensure the keys are present
        if (!import.meta.env.VITE_PINATA_API_KEY || !import.meta.env.VITE_PINATA_SECRET_API_KEY) {
            throw new Error("Missing required Pinata API environment variables.");
        }

        // Force keys to be treated as strings
        const pinataApiKey = String(import.meta.env.VITE_PINATA_API_KEY);
        const pinataSecretApiKey = String(import.meta.env.VITE_PINATA_SECRET_API_KEY);

        // Make the API request
        const response = await axios.post(endpoint, data, {
            headers: {
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey,
                "Content-Type": "application/json",
            },
        });

        // Check for success
        if (response.status === 200) {
            console.log("IPFS Upload Successful: ", response.data);
            return response.data.IpfsHash; // Return the IPFS hash
        } else {
            throw new Error(`Failed to upload to Pinata: ${response.statusText}`);
        }
    } catch (error) {
        // Log the error details for debugging
        console.error("Error uploading to IPFS with Pinata:", error.message);

        if (error.response) {
            console.error("Response error details:", error.response.data);
        } else {
            console.error("Request error:", error);
        }

        throw error;
    }
};
