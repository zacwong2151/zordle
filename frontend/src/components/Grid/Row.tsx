import Square from "./Square";
import { useWordleContext } from "@/contexts/WordleContext";

/**
 * `selectedWord` is part of the key, so that the Square components re-render upon pressing the refresh button
 */
export default function Row({ rowPos } : { rowPos: number }) {
    const { wordIdx, selectedWord, triggerWordShakeAnimation, triggerLettersFlipAnimation } = useWordleContext()
    const bool_triggerWordShakeAnimation = triggerWordShakeAnimation && wordIdx === rowPos ? "animate-shake" : ""
    const bool_triggerLettersFlipAnimation = triggerLettersFlipAnimation && wordIdx === rowPos

    const delay: number = 350 // delay for each square to flip. 350ms should be quite close to wordle

    return (
        <div className={`flex gap-2 ${bool_triggerWordShakeAnimation}`}>
            <Square key={`${rowPos}-0-${selectedWord}`} squarePos={0} rowPos={rowPos} isFlipping={bool_triggerLettersFlipAnimation} delay={delay * 0} />
            <Square key={`${rowPos}-1-${selectedWord}`} squarePos={1} rowPos={rowPos} isFlipping={bool_triggerLettersFlipAnimation} delay={delay * 1} />
            <Square key={`${rowPos}-2-${selectedWord}`} squarePos={2} rowPos={rowPos} isFlipping={bool_triggerLettersFlipAnimation} delay={delay * 2} />
            <Square key={`${rowPos}-3-${selectedWord}`} squarePos={3} rowPos={rowPos} isFlipping={bool_triggerLettersFlipAnimation} delay={delay * 3} />
            <Square key={`${rowPos}-4-${selectedWord}`} squarePos={4} rowPos={rowPos} isFlipping={bool_triggerLettersFlipAnimation} delay={delay * 4} />
        </div>
    )
}