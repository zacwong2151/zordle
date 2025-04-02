import Grid from "../Grid/Grid";
import Keyboard from "../Keyboard/Keyboard";
import HomepageNavbar from "./HomepageNavbar";
import { useWordleContext } from "@/contexts/WordleContext";
import { GridColourState } from "@/types/WordleTypes";

export default function HomePage() {
    const wordleContext = useWordleContext();

    // Grid fields
    const words: string[] = wordleContext.words
    const wordIdx: number = wordleContext.wordIdx
    const selectedWord: string = wordleContext.selectedWord
    const gridColourState: GridColourState[][] = wordleContext.gridColourState
    const triggerWordShakeAnimation: boolean = wordleContext.triggerWordShakeAnimation
    const triggerLettersFlipAnimation: boolean = wordleContext.triggerLettersFlipAnimation

    // Keyboard fields
    const setWords = wordleContext.setWords
    const setWordIdx = wordleContext.setWordIdx
    const setGridColourState = wordleContext.setGridColourState
    const keyboardColourState = wordleContext.keyboardColourState
    const setKeyboardColourState = wordleContext.setKeyboardColourState
    const isGameOver = wordleContext.isGameOver
    const setIsGameOver = wordleContext.setIsGameOver
    const popupMessage = wordleContext.popupMessage
    const setPopupMessage = wordleContext.setPopupMessage
    const setTriggerWordShakeAnimation = wordleContext.setTriggerWordShakeAnimation
    const setTriggerLettersFlipAnimation = wordleContext.setTriggerLettersFlipAnimation
    const isKeyboardDisabled = wordleContext.isKeyboardDisabled
    const setIsKeyboardDisabled = wordleContext.setIsKeyboardDisabled

    return (
        <>
            <HomepageNavbar />
            <div className="h-max w-screen flex flex-col items-center justify-center gap-4 my-6 md:my-10">
                <Grid
                    words={words}
                    wordIdx={wordIdx}
                    selectedWord={selectedWord}
                    gridColourState={gridColourState}
                    triggerWordShakeAnimation={triggerWordShakeAnimation}
                    triggerLettersFlipAnimation={triggerLettersFlipAnimation}
                    popupMessage={popupMessage}
                />
                <Keyboard 
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
                    socket={null}
                    youArePlayerOne={false} // actually should be null/undefined, but should be fine as a boolean
                    roomId={""} // actually should be null/undefined, but should be fine as an empty string
                />
            </div>
        </>
    )
}