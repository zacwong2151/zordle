import KeyboardRow from "./KeyboardRow";
import KeyboardSymbol from "./KeyBoardSymbol";
import KeyboardListener from "./KeyboardListener";
import { GridColourState, KeyboardColourState, Letter } from "@/types/WordleTypes";
import { Socket } from "socket.io-client";

const KEYBOARD_TOP_ROW = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
const KEYBOARD_MIDDLE_ROW = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
const KEYBOARD_BOTTOM_ROW = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]

export default function Keyboard({
    words, setWords,
    wordIdx, setWordIdx,
    selectedWord,
    gridColourState, setGridColourState,
    keyboardColourState, setKeyboardColourState,
    isGameOver, setIsGameOver,
    popupMessage, setPopupMessage,
    triggerWordShakeAnimation, setTriggerWordShakeAnimation,
    triggerLettersFlipAnimation, setTriggerLettersFlipAnimation,
    isKeyboardDisabled, setIsKeyboardDisabled,
    socket
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
    socket: Socket | null,
}) {
    return (
        <div className="flex flex-col items-center w-full max-w-[600px] px-1">
            <KeyboardListener
                words={words}
                setWords={setWords}
                wordIdx={wordIdx}
                setWordIdx={setWordIdx}
                selectedWord={selectedWord}
                gridColourState={gridColourState}
                setGridColourState={setGridColourState}
                keyboardColourState={keyboardColourState}
                setKeyboardColourState={setKeyboardColourState}
                isGameOver={isGameOver}
                setIsGameOver={setIsGameOver}
                popupMessage={popupMessage}
                setPopupMessage={setPopupMessage}
                triggerWordShakeAnimation={triggerWordShakeAnimation}
                setTriggerWordShakeAnimation={setTriggerWordShakeAnimation}
                triggerLettersFlipAnimation={triggerLettersFlipAnimation}
                setTriggerLettersFlipAnimation={setTriggerLettersFlipAnimation}
                isKeyboardDisabled={isKeyboardDisabled}
                setIsKeyboardDisabled={setIsKeyboardDisabled}
                socket={socket}
            />
            <KeyboardRow>
                {KEYBOARD_TOP_ROW.map((symbol, index) => (
                    <KeyboardSymbol
                        key={index}
                        symbol={symbol}
                        words={words}
                        setWords={setWords}
                        wordIdx={wordIdx}
                        setWordIdx={setWordIdx}
                        selectedWord={selectedWord}
                        gridColourState={gridColourState}
                        setGridColourState={setGridColourState}
                        keyboardColourState={keyboardColourState}
                        setKeyboardColourState={setKeyboardColourState}
                        isGameOver={isGameOver}
                        setIsGameOver={setIsGameOver}
                        setPopupMessage={setPopupMessage}
                        setTriggerWordShakeAnimation={setTriggerWordShakeAnimation}
                        setTriggerLettersFlipAnimation={setTriggerLettersFlipAnimation}
                        isKeyboardDisabled={isKeyboardDisabled}
                        setIsKeyboardDisabled={setIsKeyboardDisabled}
                    />
                ))}
            </KeyboardRow>
            <KeyboardRow>
                {KEYBOARD_MIDDLE_ROW.map((symbol, index) => (
                    <KeyboardSymbol
                        key={index}
                        symbol={symbol}
                        words={words}
                        setWords={setWords}
                        wordIdx={wordIdx}
                        setWordIdx={setWordIdx}
                        selectedWord={selectedWord}
                        gridColourState={gridColourState}
                        setGridColourState={setGridColourState}
                        keyboardColourState={keyboardColourState}
                        setKeyboardColourState={setKeyboardColourState}
                        isGameOver={isGameOver}
                        setIsGameOver={setIsGameOver}
                        setPopupMessage={setPopupMessage}
                        setTriggerWordShakeAnimation={setTriggerWordShakeAnimation}
                        setTriggerLettersFlipAnimation={setTriggerLettersFlipAnimation}
                        isKeyboardDisabled={isKeyboardDisabled}
                        setIsKeyboardDisabled={setIsKeyboardDisabled}
                    />
                ))}
            </KeyboardRow>
            <KeyboardRow>
                {KEYBOARD_BOTTOM_ROW.map((symbol, index) => (
                    <KeyboardSymbol
                        key={index}
                        symbol={symbol}
                        words={words}
                        setWords={setWords}
                        wordIdx={wordIdx}
                        setWordIdx={setWordIdx}
                        selectedWord={selectedWord}
                        gridColourState={gridColourState}
                        setGridColourState={setGridColourState}
                        keyboardColourState={keyboardColourState}
                        setKeyboardColourState={setKeyboardColourState}
                        isGameOver={isGameOver}
                        setIsGameOver={setIsGameOver}
                        setPopupMessage={setPopupMessage}
                        setTriggerWordShakeAnimation={setTriggerWordShakeAnimation}
                        setTriggerLettersFlipAnimation={setTriggerLettersFlipAnimation}
                        isKeyboardDisabled={isKeyboardDisabled}
                        setIsKeyboardDisabled={setIsKeyboardDisabled}
                    />
                ))}
            </KeyboardRow>
        </div>
    )
}