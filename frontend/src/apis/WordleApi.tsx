import axios from "axios";

const DEV_BASE_URL = 'http://localhost:8000'
const PROD_BASE_URL = "https://wordservice.fly.dev"
const GET_RANDOM_WORD_URL = '/random-word'
const IS_WORD_IN_DB_URL = '/is-word-in-DB'

/**
 * Gets a random 5-letter word from the dataset.
 */
export async function getRandomWord() {
    try {
        const response = await axios.get(DEV_BASE_URL + GET_RANDOM_WORD_URL)
        return response.data.word
    } catch (error) {
        console.error(error)
        return null
    }
}

/**
 * Checks if a word exists in the dataset.
 */
export async function isWordInDB(word: string) {
    try {
        const response = await axios.get(DEV_BASE_URL + IS_WORD_IN_DB_URL + `/${word}`, {
            validateStatus: (status) => {
                // Accept all HTTP status codes, so 404 doesn't trigger the catch block
                return status >= 200 && status < 500;
            }
        }); 
        if (response.status === 200) {
            return true
        }
        if (response.status === 404) {
            return false
        }
    } catch (error) {
        console.error(error)
        return false
    }
}