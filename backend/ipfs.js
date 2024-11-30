import axios from "axios";
import { PINATA_API_KEY, PINATA_SECRET_API_KEY, PINATA_ENDPOINT } from "./config";

/**
 * Upload JSON data to Pinata and get the IPFS hash.
 * @param {Object} data - The data to upload as JSON.
 * @returns {Promise<string>} - The IPFS hash of the uploaded data.
 */
export const uploadToIPFS = async (data) => {
    try {
        const response = await axios.post(PINATA_ENDPOINT, data, {
            headers: {
                pinata_api_key: PINATA_API_KEY,
                pinata_secret_api_key: PINATA_SECRET_API_KEY,
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            console.log("IPFS Upload Successful: ", response.data);
            return response.data.IpfsHash;
        } else {
            throw new Error("Failed to upload to Pinata");
        }
    } catch (error) {
        console.error("Error uploading to IPFS with Pinata:", error.message);
        throw error;
    }
};
