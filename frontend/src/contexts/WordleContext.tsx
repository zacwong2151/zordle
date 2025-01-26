import React, { createContext, useState, ReactNode, useContext, useEffect } from "react"
import { Words } from "../types/Words"
import { getRandomWord } from "../apis/WordleApi"
import { GridColourState, KeyboardColourState } from "../types/ColourState"
import { Letter } from "../types/Letter"

type WordleStateType = {
    words: Words,
    setWords: React.Dispatch<React.SetStateAction<Words>>,
    wordIdx: number,
    setWordIdx: React.Dispatch<React.SetStateAction<number>>,
    selectedWord: string | null,
    setSelectedWord: React.Dispatch<React.SetStateAction<string | null>>,
    gridColourState: GridColourState[][],
    setGridColourState: React.Dispatch<React.SetStateAction<GridColourState[][]>>,
    keyboardColourState: Record<Letter, KeyboardColourState>,
    setKeyboardColourState: React.Dispatch<React.SetStateAction<Record<Letter, KeyboardColourState>>>,
    isGameOver: boolean,
    setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>,
    popupMessage: string | null,
    setPopupMessage: React.Dispatch<React.SetStateAction<string | null>>,
    triggerWordShakeAnimation: boolean,
    setTriggerWordShakeAnimation: React.Dispatch<React.SetStateAction<boolean>>,
    triggerLettersFlipAnimation: boolean,
    setTriggerLettersFlipAnimation: React.Dispatch<React.SetStateAction<boolean>>,
    isKeyboardDisabled: boolean,
    setIsKeyboardDisabled: React.Dispatch<React.SetStateAction<boolean>>,
}

const WordleContext = createContext<WordleStateType | null>(null)

const WordleContextProvider = ({ children } : { children: ReactNode }) => {
    const [words, setWords] = useState<Words>(["", "", "", "", "", ""]) 
    const [wordIdx, setWordIdx] = useState<number>(0)
    const [selectedWord, setSelectedWord] = useState<string | null>(null)
    const [gridColourState, setGridColourState] = useState<GridColourState[][]>(
        [
            ['white', 'white', 'white', 'white', 'white'],
            ['white', 'white', 'white', 'white', 'white'],
            ['white', 'white', 'white', 'white', 'white'],
            ['white', 'white', 'white', 'white', 'white'],
            ['white', 'white', 'white', 'white', 'white'],
            ['white', 'white', 'white', 'white', 'white']
        ]
    )
    const [keyboardColourState, setKeyboardColourState] = useState<Record<Letter, KeyboardColourState>>(
        {} as Record<Letter, KeyboardColourState>
    )
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [popupMessage, setPopupMessage] = useState<string | null>(null)
    const [triggerWordShakeAnimation, setTriggerWordShakeAnimation] = useState<boolean>(false)
    const [triggerLettersFlipAnimation, setTriggerLettersFlipAnimation] = useState<boolean>(false)
    const [isKeyboardDisabled, setIsKeyboardDisabled] = useState<boolean>(false)
    
    /**
     * Initialize keyboardColourState with all letters set to "gray"
     */
    useEffect(() => {
        const initialKeyboardColourState: Record<Letter, KeyboardColourState> = {} as Record<Letter, KeyboardColourState>
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(letter => {
            initialKeyboardColourState[letter as Letter] = "gray"
        })
        setKeyboardColourState(initialKeyboardColourState)
    }, [])

    /**
     * Fetches a random word from DB upon page render
     */
    useEffect(() => {
        async function fetchRandomWord() {
            const word = await getRandomWord()
            console.log(`The selected word is ${word}`)
            setSelectedWord(word)
        }
        fetchRandomWord()
    }, [])

    const wordleState: WordleStateType = {
        words, setWords,
        wordIdx, setWordIdx,
        selectedWord, setSelectedWord,
        gridColourState, setGridColourState,
        keyboardColourState, setKeyboardColourState,
        isGameOver, setIsGameOver,
        popupMessage, setPopupMessage,
        triggerWordShakeAnimation, setTriggerWordShakeAnimation,
        triggerLettersFlipAnimation, setTriggerLettersFlipAnimation,
        isKeyboardDisabled, setIsKeyboardDisabled,
    }
    
    return (
        <WordleContext.Provider value={wordleState}>
            {children}
        </WordleContext.Provider>
    )
}

function useWordleContext() {
    const context = useContext(WordleContext)
    if (!context) {
        throw new Error("useWordleContext must be used within a WordleContextProvider")
    }
    return context
}

export { WordleContextProvider, useWordleContext }
