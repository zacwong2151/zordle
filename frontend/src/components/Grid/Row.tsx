import Square from "./Square";
import { GridColourState } from "@/types/WordleTypes";

/**
 * `selectedWord` is part of the key, so that the Square components re-render upon pressing the refresh button
 */
export default function Row({
    rowPos,
    words,
    wordIdx,
    selectedWord,
    gridColourState,
    triggerWordShakeAnimation,
    triggerLettersFlipAnimation,
}: {
    rowPos: number,
    words: string[]
    wordIdx: number
    selectedWord: string,
    gridColourState: GridColourState[][]
    triggerWordShakeAnimation: boolean
    triggerLettersFlipAnimation: boolean
}) {
    const bool_triggerWordShakeAnimation = triggerWordShakeAnimation && wordIdx === rowPos ? "animate-shake" : ""
    const bool_triggerLettersFlipAnimation = triggerLettersFlipAnimation && wordIdx === rowPos

    const delay: number = 350 // delay for each square to flip. 350ms should be quite close to wordle

    return (
        <div className={`flex gap-2 ${bool_triggerWordShakeAnimation}`}>
            {Array(selectedWord.length).fill("").map((_, index) => (
                <Square 
                    key={`${rowPos}-${index}-${selectedWord}`}
                    squarePos={index}
                    rowPos={rowPos}
                    isFlipping={bool_triggerLettersFlipAnimation}
                    delay={delay * index}
                    words={words}
                    wordIdx={wordIdx}
                    gridColourState={gridColourState}
                />
            ))}
        </div>
    )
}