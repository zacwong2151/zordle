import { GridColourState } from "../types/WordleTypes"
import { isWordInDB } from "../apis/WordleApis"
import { KeyboardColourState, Letter } from "../types/WordleTypes"
import { Socket } from "socket.io-client"
import { UpdateGameDto } from "@/types/BattleTypes"
import { updateGameInfo } from "@/apis/BattleApis"

const MAX_WORD_LENGTH = 5
const MAX_NO_OF_WORDS = 6
export const LETTERS_FLIP_ANIMATION_TIME = 2000 // time taken for all letters of a word to flip
const SHORT_POPUP_DURATION = 2000

export function isCurrentWordFull(
    words: string[],
    wordIdx: number
) {
    if (words[wordIdx].length === MAX_WORD_LENGTH) {
        return true
    }
    return false
}

/**
 * Handles the case where user clicks 'enter'
 */
export async function handleEnter(
    words: string[],
    wordIdx: number,
    setWordIdx: React.Dispatch<React.SetStateAction<number>>,
    setWords: React.Dispatch<React.SetStateAction<string[]>>,
    selectedWord: string,
    gridColourState: GridColourState[][],
    setGridColourState: React.Dispatch<React.SetStateAction<GridColourState[][]>>,
    keyboardColourState: Record<Letter, KeyboardColourState>,
    setKeyboardColourState: React.Dispatch<React.SetStateAction<Record<Letter, KeyboardColourState>>>,
    isGameOver: boolean,
    setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>,
    setPopupMessage: React.Dispatch<React.SetStateAction<string | null>>,
    setTriggerWordShakeAnimation: React.Dispatch<React.SetStateAction<boolean>>,
    setTriggerLettersFlipAnimation: React.Dispatch<React.SetStateAction<boolean>>,
    isKeyboardDisabled: boolean,
    setIsKeyboardDisabled: React.Dispatch<React.SetStateAction<boolean>>,
    socket: Socket | null,
    youArePlayerOne: boolean,
    roomId: string
) {
    if (isKeyboardDisabled) return
    setIsKeyboardDisabled(true)

    if (isGameOver) {
        showPopupMessage('Game is over!', setPopupMessage, SHORT_POPUP_DURATION)
        setIsKeyboardDisabled(false)
        return
    }
    if (!isCurrentWordFull(words, wordIdx)) {
        triggerWordShakeAnimation(setTriggerWordShakeAnimation)
        showPopupMessage('Not enough letters', setPopupMessage, SHORT_POPUP_DURATION)
        setIsKeyboardDisabled(false)
        return
    }
    const currentWord = words[wordIdx]
    const bool_isWordInDb = isWordInDB(currentWord)
    if (!bool_isWordInDb) {
        triggerWordShakeAnimation(setTriggerWordShakeAnimation)
        showPopupMessage('Not in word list', setPopupMessage, SHORT_POPUP_DURATION)
        setIsKeyboardDisabled(false)
        return
    }

    // Update immediately
    const newGridColourState = newGridColour(currentWord, selectedWord, wordIdx, gridColourState, setGridColourState)
    setGridColourState(newGridColourState)

    // Update after LETTERS_FLIP_ANIMATION_TIME
    const newWordIdx = wordIdx + 1
    const newKeyboardColourState = newKeyboardColour(currentWord, selectedWord, keyboardColourState, setKeyboardColourState)

    const isGOver: boolean = currentWord === selectedWord || wordIdx === MAX_NO_OF_WORDS - 1
    triggerLettersFlipAnimation(setTriggerLettersFlipAnimation)

    // Send the newGridColourState to websocket. 
    if (socket) {
        socket.emit('new-grid-colour', newGridColourState)

        // Need to save your: words, wordIdx, gridColourState, keyboardColourState, isGameOver (isKeyboardDisabled depends on isGameOver)
        if (youArePlayerOne) {
            const gameReqBody: UpdateGameDto = {
                player1_words: words,
                player1_wordIdx: newWordIdx,
                player1_gridColourState: newGridColourState,
                player1_keyboardColourState: newKeyboardColourState,
                player1_isGameOver: isGOver
            }
            await updateGameInfo(roomId, gameReqBody)
        } else {
            const gameReqBody: UpdateGameDto = {
                player2_words: words,
                player2_wordIdx: newWordIdx,
                player2_gridColourState: newGridColourState,
                player2_keyboardColourState: newKeyboardColourState,
                player2_isGameOver: isGOver
            }
            await updateGameInfo(roomId, gameReqBody)
        }
    }

    setTimeout(async () => {
        setIsKeyboardDisabled(false)
        setWordIdx(newWordIdx)
        setKeyboardColourState(newKeyboardColourState)

        if (currentWord === selectedWord) {
            showPopupMessage('Good job you got the answer', setPopupMessage, SHORT_POPUP_DURATION)
            setIsGameOver(true)
        } else if (wordIdx === MAX_NO_OF_WORDS - 1) { // user has expended all tries and did not guess the word
            showPopupMessage(selectedWord, setPopupMessage, 3600000) // show correct word for 1hr
            setIsGameOver(true)
        }
    }, LETTERS_FLIP_ANIMATION_TIME)
}

function triggerWordShakeAnimation(setTriggerWordShakeAnimation: React.Dispatch<React.SetStateAction<boolean>>) {
    setTriggerWordShakeAnimation(true)
    setTimeout(() => {
        setTriggerWordShakeAnimation(false)
    }, 500)
}

export function triggerLettersFlipAnimation(setTriggerLettersFlipAnimation: React.Dispatch<React.SetStateAction<boolean>>) {
    setTriggerLettersFlipAnimation(true)
    setTimeout(() => {
        setTriggerLettersFlipAnimation(false)
    }, LETTERS_FLIP_ANIMATION_TIME)
}

/**
 * Shows pop up message for a specified duration.
 */
function showPopupMessage(popupMessage: string, setPopupMessage: React.Dispatch<React.SetStateAction<string | null>>, duration: number) {
    setPopupMessage(popupMessage)

    setTimeout(() => {
        setPopupMessage(null)
    }, duration)
}

/**
 * Return the new grid colour state.
 */
function newGridColour(
    currentWord: string,
    selectedWord: string,
    wordIdx: number,
    gridColourState: GridColourState[][],
    setGridColourState: React.Dispatch<React.SetStateAction<GridColourState[][]>>,
) {
    const letterFreq: Record<string, number> = getLetterFreq(selectedWord)
    const newColourStateRow: GridColourState[] = new Array(MAX_WORD_LENGTH).fill("gray")

    /*
        Iterate through current word twice. First iteration to identify all the greens.
        Second iteration to fill in the yellows. Default colour is set to gray.
    */
    for (let pos = 0; pos < MAX_WORD_LENGTH; pos++) {
        if (currentWord[pos] === selectedWord[pos]) {
            letterFreq[currentWord[pos]]--
            newColourStateRow[pos] = "green"
        }
    }
    for (let pos = 0; pos < MAX_WORD_LENGTH; pos++) {
        if (currentWord[pos] !== selectedWord[pos] && // the letter does not match
            selectedWord.includes(currentWord[pos]) && // the letter is in the word
            letterFreq[currentWord[pos]] > 0) {
            letterFreq[currentWord[pos]]--
            newColourStateRow[pos] = "yellow"
        }
    }

    const newGridColourState = [
        ...gridColourState.slice(0, wordIdx),
        newColourStateRow,
        ...gridColourState.slice(wordIdx + 1, MAX_NO_OF_WORDS)
    ]

    return newGridColourState
}

/**
 * Count the frequency of each letter in selected word and store in an object (hashmap).
 */
function getLetterFreq(word: string) {
    const letterFreq = {} as Record<string, number>
    word.split("").forEach(letter => {
        if (letterFreq[letter]) {
            letterFreq[letter]++
        } else {
            letterFreq[letter] = 1
        }
    })
    return letterFreq
}

/**
 * Return the new keyboard colour state.
 */
function newKeyboardColour(
    currentWord: string,
    selectedWord: string,
    keyboardColourState: Record<Letter, KeyboardColourState>,
    setKeyboardColourState: React.Dispatch<React.SetStateAction<Record<Letter, KeyboardColourState>>>,
) {
    const newKeyboardColourState: Record<Letter, KeyboardColourState> = { ...keyboardColourState }

    for (let pos = 0; pos < MAX_WORD_LENGTH; pos++) {
        if (currentWord[pos] === selectedWord[pos]) {
            newKeyboardColourState[currentWord[pos] as Letter] = "green"
        } else if (selectedWord.includes(currentWord[pos])) {
            if (newKeyboardColourState[currentWord[pos] as Letter] !== "green") newKeyboardColourState[currentWord[pos] as Letter] = "yellow"
        } else {
            newKeyboardColourState[currentWord[pos] as Letter] = "dark gray"
        }
    }

    return newKeyboardColourState
}

/**
 * Handles the case where user clicks 'backspace'.
 */
export function handleBackspace(
    words: string[],
    wordIdx: number,
    setWords: React.Dispatch<React.SetStateAction<string[]>>,
    isGameOver: boolean,
    isKeyboardDisabled: boolean,
) {
    if (isGameOver || isKeyboardDisabled) return

    if (words[wordIdx].length === 0) {
        return
    }
    const newCurrWord = words[wordIdx].slice(0, words[wordIdx].length - 1)
    const newWords = [
        ...words.slice(0, wordIdx),
        newCurrWord,
        ...words.slice(wordIdx + 1, MAX_NO_OF_WORDS)
    ]
    setWords(newWords)
}

/**
 * Handles the case where user enters a letter.
 */
export function handleLetter(
    letter: string,
    words: string[],
    wordIdx: number,
    setWords: React.Dispatch<React.SetStateAction<string[]>>,
    isGameOver: boolean,
    isKeyboardDisabled: boolean,
) {
    if (isGameOver || isKeyboardDisabled) return

    if (isCurrentWordFull(words, wordIdx)) {
        console.log('Hey, this word is full, you cannot enter any more letters')
        return
    }

    const newCurrWord = words[wordIdx] + letter
    const newWords = [
        ...words.slice(0, wordIdx),
        newCurrWord,
        ...words.slice(wordIdx + 1, MAX_NO_OF_WORDS)
    ]
    setWords(newWords)
}






