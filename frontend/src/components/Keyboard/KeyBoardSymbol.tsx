import { IoBackspaceOutline } from "react-icons/io5";
import { handleBackspace, handleEnter, handleLetter } from "../../utils/WordleUtils";
import { GridColourState, KeyboardColourState, Letter } from "@/types/WordleTypes";

export default function KeyboardSymbol({
    symbol,
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
    symbol: string
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
    setPopupMessage: React.Dispatch<React.SetStateAction<string | null>>,
    setTriggerWordShakeAnimation: React.Dispatch<React.SetStateAction<boolean>>,
    setTriggerLettersFlipAnimation: React.Dispatch<React.SetStateAction<boolean>>,
    isKeyboardDisabled: boolean,
    setIsKeyboardDisabled: React.Dispatch<React.SetStateAction<boolean>>,
}) {
    if (symbol === "BACKSPACE") {
        return (
            <div
                className="w-[10%] min-w-[40px] h-auto aspect-[6/7] bg-slate-300 border-white text-black font-bold rounded-md text-xl flex items-center justify-center cursor-pointer"
                onClick={() => handleBackspace(words, wordIdx, setWords, isGameOver)}
            >
                <IoBackspaceOutline />
            </div>
        )
    }
    if (symbol === "ENTER") {
        return (
            <div
                className="w-[15%] min-w-[60px] h-auto aspect-[10/7] bg-slate-300 border-white text-black font-bold rounded-md text-base flex items-center justify-center cursor-pointer select-none"
                onClick={() => handleEnter(words, wordIdx, setWordIdx, setWords, selectedWord, gridColourState, setGridColourState, keyboardColourState, setKeyboardColourState, isGameOver, setIsGameOver, setPopupMessage, setTriggerWordShakeAnimation, setTriggerLettersFlipAnimation, isKeyboardDisabled, setIsKeyboardDisabled)}
            >
                {symbol}
            </div>
        )
    }

    const colourState = keyboardColourState[symbol as keyof typeof keyboardColourState]
    const textColour = colourState === "gray" ? "text-black" : "text-white"

    let backgroundColour = ""
    switch (colourState) {
        case "gray":
            backgroundColour = "bg-slate-300"
            break
        case "dark gray":
            backgroundColour = "bg-slate-500"
            break
        case "yellow":
            backgroundColour = "bg-yellow-500"
            break
        case "green":
            backgroundColour = "bg-green-600"
            break
    }

    return (
        <div
            className={`w-[10%] min-w-[30px] max-w-[50px] aspect-[5/7] ${backgroundColour} ${textColour} border-white font-bold rounded-md text-lg flex items-center justify-center cursor-pointer select-none`}
            onClick={() => handleLetter(symbol, words, wordIdx, setWords, isGameOver, isKeyboardDisabled)}
        >
            {symbol}
        </div>
    )
}