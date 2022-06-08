import axios from "axios";
import { API_URL } from "utils/constants";

/**
 * Get a specific number of random quotes
 * @param {number} count The number of quotes, defaults to 1.
 */
export async function getRandomQuote() {
    try {
        const result = await axios.get(`${API_URL}/quotes/random`);
        return result.data;
    }  
    catch(e) {
        throw(e);
    }
}