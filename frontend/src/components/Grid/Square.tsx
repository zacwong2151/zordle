import { useState, useEffect } from "react";
import { useWordleContext } from "../../contexts/WordleContext";

export default function Square({ squarePos, rowPos, isFlipping, delay } : { squarePos: number, rowPos: number, isFlipping: boolean, delay: number }) {
    const { words, wordIdx, gridColourState } = useWordleContext()
    const [isFlipped, setIsFlipped] = useState<boolean>(false) // used for letter flipping logic
    const [showColor, setShowColor] = useState<boolean>(false) // used for letter flipping colour logic

    useEffect(() => {
      if (isFlipping) {
        const flipTimer = setTimeout(() => setIsFlipped(true), delay)
        const colourTimer = setTimeout(() => setShowColor(true), delay + 350) // half of 700
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
    
    const textColour = rowPos < wordIdx ? "text-white" : "text-black"   

    let bgColour = ""
    switch(gridColourState[rowPos][squarePos]) {
        case "white":
            bgColour = "bg-white"
            break
        case "gray":
            bgColour = "bg-slate-500"
            break
        case "yellow":
            bgColour = "bg-yellow-500"
            break
        case "green":
            bgColour = "bg-green-600"
            break
    }

    return (
        <div className="relative w-16 h-16 perspective-500">
          <div // the 'duration' attribute determines how slow a flip is
            className={`w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? "rotate-x-180" : ""}`}
          >
            <div // back face
              className={`absolute w-full h-full backface-hidden border-gray-500 border-2 flex items-center justify-center font-bold text-3xl ${showColor ? bgColour : "bg-white"} ${showColor ? textColour : "text-black"} ${isFlipped ? "rotate-x-180" : ""}`}
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