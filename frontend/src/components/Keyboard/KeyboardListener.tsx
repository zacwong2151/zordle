import { useEffect } from "react";
import { handleBackspace, handleEnter, handleLetter } from "../../utils/WordleUtils";
import { GridColourState, KeyboardColourState, Letter } from "@/types/WordleTypes";
/**
 * Listens to keyboard presses from user.
 */
export default function KeyboardListener({
    words, setWords,
    wordIdx, setWordIdx,
    selectedWord,
    gridColourState, setGridColourState,
    keyboardColourState, setKeyboardColourState,
    isGameOver, setIsGameOver,
    setPopupMessage,
    setTriggerWordShakeAnimation,
    setTriggerLettersFlipAnimation,
    isKeyboardDisabled, setIsKeyboardDisabled
}: {
    words: string[],
    setWords: React.Dispatch<React.SetStateAction<string[]>>,
    wordIdx: number,
    setWordIdx: React.Dispatch<React.SetStateAction<number>>,
    selectedWord: string,
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
}) {
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            const key: string = event.key.toLowerCase()
            switch (key) {
                case "enter":
                    handleEnter(words, wordIdx, setWordIdx, setWords, selectedWord, gridColourState, setGridColourState, keyboardColourState, setKeyboardColourState, isGameOver, setIsGameOver, setPopupMessage, setTriggerWordShakeAnimation, setTriggerLettersFlipAnimation, isKeyboardDisabled, setIsKeyboardDisabled)
                    break
                case "backspace":
                    handleBackspace(words, wordIdx, setWords, isGameOver)
                    break
                case "a":
                    handleLetter("A", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "b":
                    handleLetter("B", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "c":
                    handleLetter("C", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "d":
                    handleLetter("D", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "e":
                    handleLetter("E", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "f":
                    handleLetter("F", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "g":
                    handleLetter("G", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "h":
                    handleLetter("H", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "i":
                    handleLetter("I", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "j":
                    handleLetter("J", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "k":
                    handleLetter("K", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "l":
                    handleLetter("L", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "m":
                    handleLetter("M", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "n":
                    handleLetter("N", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "o":
                    handleLetter("O", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "p":
                    handleLetter("P", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "q":
                    handleLetter("Q", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "r":
                    handleLetter("R", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "s":
                    handleLetter("S", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "t":
                    handleLetter("T", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "u":
                    handleLetter("U", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "v":
                    handleLetter("V", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "w":
                    handleLetter("W", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "x":
                    handleLetter("X", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "y":
                    handleLetter("Y", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break
                case "z":
                    handleLetter("Z", words, wordIdx, setWords, isGameOver, isKeyboardDisabled)
                    break

            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [words, wordIdx, setWordIdx, setWords, selectedWord, gridColourState, setGridColourState, keyboardColourState, setKeyboardColourState, isGameOver, setIsGameOver, setPopupMessage, setTriggerWordShakeAnimation, setTriggerLettersFlipAnimation, isKeyboardDisabled, setIsKeyboardDisabled]);

    return null
}
