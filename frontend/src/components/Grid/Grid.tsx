import Row from "./Row";
import Popup from "./Popup";
import { GridColourState } from "@/types/WordleTypes";

export default function Grid({
    words,
    wordIdx,
    selectedWord,
    gridColourState,
    triggerWordShakeAnimation,
    triggerLettersFlipAnimation,
    popupMessage
}: {
    words: string[]
    wordIdx: number
    selectedWord: string,
    gridColourState: GridColourState[][]
    triggerWordShakeAnimation: boolean
    triggerLettersFlipAnimation: boolean
    popupMessage: string | null
}) {
    return (
        <>
            <div className="grid gap-2">
                {
                    Array(words.length).fill("").map((_, index) => (
                        <Row
                            key={index}
                            rowPos={index}
                            words={words}
                            wordIdx={wordIdx}
                            selectedWord={selectedWord}
                            gridColourState={gridColourState}
                            triggerWordShakeAnimation={triggerWordShakeAnimation}
                            triggerLettersFlipAnimation={triggerLettersFlipAnimation}
                        />
                    ))
                }
            </div>
            <Popup popupMessage={popupMessage} />
        </>
    )
}