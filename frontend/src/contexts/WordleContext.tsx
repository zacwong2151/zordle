import React, { createContext, useState, ReactNode, useContext, useEffect } from "react"
import { getRandomWord } from "../apis/WordleApis"
import { GridColourState, KeyboardColourState, Letter } from "../types/WordleTypes"
import { DEFAULT_WORDS, DEFAULT_GRID_COLOUR_STATE, DEFAULT_KEYBOARD_COLOUR_STATE } from "./DefaultStates"

type WordleStateType = {
    words: string[],
    setWords: React.Dispatch<React.SetStateAction<string[]>>,
    wordIdx: number,
    setWordIdx: React.Dispatch<React.SetStateAction<number>>,
    selectedWord: string,
    setSelectedWord: React.Dispatch<React.SetStateAction<string>>,
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
    const [words, setWords] = useState<string[]>(DEFAULT_WORDS) 
    const [wordIdx, setWordIdx] = useState<number>(0)
    const [selectedWord, setSelectedWord] = useState<string>("")
    const [gridColourState, setGridColourState] = useState<GridColourState[][]>(DEFAULT_GRID_COLOUR_STATE)
    const [keyboardColourState, setKeyboardColourState] = useState<Record<Letter, KeyboardColourState>>(DEFAULT_KEYBOARD_COLOUR_STATE)
    const [isGameOver, setIsGameOver] = useState<boolean>(false)
    const [popupMessage, setPopupMessage] = useState<string | null>(null)
    const [triggerWordShakeAnimation, setTriggerWordShakeAnimation] = useState<boolean>(false)
    const [triggerLettersFlipAnimation, setTriggerLettersFlipAnimation] = useState<boolean>(false)
    const [isKeyboardDisabled, setIsKeyboardDisabled] = useState<boolean>(false)

    useEffect(() => {
        const randomWord = getRandomWord()
        setSelectedWord(randomWord)
        console.log(`selected word is ${randomWord}`)
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
