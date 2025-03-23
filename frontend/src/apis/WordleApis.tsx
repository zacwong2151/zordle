import axios from "axios";

const DEV_WORD_SERVICE_URL = 'http://localhost:8000'
const PROD_WORD_SERVICE_URL = "https://wordservice.fly.dev"
const GET_RANDOM_WORD_URL = '/random-word'
const IS_WORD_IN_DB_URL = '/is-word-in-DB'

/**
 * Gets a random 5-letter word from the dataset.
 */
export async function getRandomWord(): Promise<string | null> {
    try {
        const response = await axios.get(DEV_WORD_SERVICE_URL + GET_RANDOM_WORD_URL)
        return response.data.word
    } catch (error) {
        console.error(error)
        return null
    }
}

/**
 * Checks if a word exists in the dataset.
 */
export async function isWordInDB(word: string): Promise<boolean> {
    try {
        const response = await axios.get(DEV_WORD_SERVICE_URL + IS_WORD_IN_DB_URL + `/${word}`, {
            validateStatus: (status) => status < 500
        })
        if (response.status === 404) {
            return false
        }
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}