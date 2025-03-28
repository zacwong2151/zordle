import { useState, useEffect } from "react";
import { GridColourState } from "@/types/WordleTypes";

export default function Square({
    squarePos,
    rowPos, 
    isFlipping,
    delay,
    words,
    wordIdx,
    gridColourState
}: {
    squarePos: number, 
    rowPos: number, 
    isFlipping: boolean, 
    delay: number,
    words: string[]
    wordIdx: number,
    gridColourState: GridColourState[][]
}) {
    const [isFlipped, setIsFlipped] = useState<boolean>(false) // when set to true, letters do their flipping animation
    const [showBackFace, setShowBackFace] = useState<boolean>(false) // when set to true, show letters' back face

    // Fixed bug: grid colour disappearing when you navigate to '/login' and back
    useEffect(() => {
        if (rowPos < wordIdx) {
            setShowBackFace(true)
        }
    }, [])

    // useEffect is necessary to introduce the delay when flipping the Square
    useEffect(() => {
        if (isFlipping) {
            const flipTimer = setTimeout(() => setIsFlipped(true), delay)
            const colourTimer = setTimeout(() => setShowBackFace(true), delay + 350) // half of 700
            return () => {
                clearTimeout(flipTimer)
                clearTimeout(colourTimer)
            }
        }
    }, [isFlipping, delay])

    let letter = ""
    if (rowPos <= wordIdx && squarePos <= words[rowPos].length) {
        letter = words[rowPos][squarePos]
    }

    const backFace_textColour = rowPos <= wordIdx ? "text-white" : "text-black"

    let backFace_bgColour = ""
    switch (gridColourState[rowPos][squarePos]) {
        case "white":
            backFace_bgColour = "bg-white"
            break
        case "gray":
            backFace_bgColour = "bg-slate-500"
            break
        case "yellow":
            backFace_bgColour = "bg-yellow-500"
            break
        case "green":
            backFace_bgColour = "bg-green-600"
            break
    }

    return (
        <div className="relative w-16 h-16 perspective-500">
            <div // the 'duration' attribute determines how slow a flip is
                className={`w-full h-full select-none transition-transform duration-700 transform-style-3d ${isFlipped ? "rotate-x-180" : ""}`}
            >
                <div // back face
                    className={`absolute w-full h-full backface-hidden border-gray-500 border-2 flex items-center justify-center font-bold text-3xl ${showBackFace ? backFace_bgColour + " " + backFace_textColour : "bg-white text-black"} ${isFlipped ? "rotate-x-180" : ""}`}
                >
                    {letter}
                </div>
                <div // front face
                    className={`absolute w-full h-full backface-hidden border-gray-500 border-2 flex items-center justify-center font-bold text-3xl bg-white text-black ${isFlipped ? "" : "rotate-x-180"}`}
                >
                    {letter}
                </div>
            </div>
        </div>
    )
}