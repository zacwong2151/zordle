import { words_to_accept } from "@/components/WordsDataSet/words-to-accept"
import { words_to_guess } from "@/components/WordsDataSet/words-to-guess"

/*
    Not considered API anymore but will just leave it here for convenience
*/

/**
 * Gets a random 5-letter word from the dataset.
 */
export function getRandomWord(): string {
    const randomPos = Math.floor(Math.random() * words_to_guess.length)
    const randomWord = words_to_guess[randomPos]

    return randomWord
}

/**
 * Checks if a word exists in the dataset.
 */
export function isWordInDB(word: string): boolean {
    return words_to_accept.includes(word)
}