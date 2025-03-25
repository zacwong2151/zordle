import { useState, useEffect } from "react";
import { useWordleContext } from "../../contexts/WordleContext";
import { useWhichPlayerContext } from "@/contexts/WhichPlayerContext";
import { WhichPlayer } from "@/types/BattleTypes";
import { DEFAULT_GRID_COLOUR_STATE } from "@/contexts/DefaultStates";
import { useBattleContext } from "@/contexts/BattleContext";
import { GridColourState } from "@/types/WordleTypes";

export default function Square({ squarePos, rowPos, isFlipping, delay } : { squarePos: number, rowPos: number, isFlipping: boolean, delay: number }) {
    const whichPlayer: WhichPlayer = useWhichPlayerContext()
    const wordleContext = useWordleContext()
    const battleContext = useBattleContext()

    const [words, setWords] = useState<string[]>(["", "", "", "", "", ""])
    const [wordIdx, setWordIdx] = useState<number>(0)
    const [gridColourState, setGridColourState] = useState<GridColourState[][]>(DEFAULT_GRID_COLOUR_STATE)

    useEffect(() => {
        if (whichPlayer === WhichPlayer.SOLO) {
            setWords(wordleContext.words)
            setWordIdx(wordleContext.wordIdx)
            setGridColourState(wordleContext.gridColourState)
        } else if (whichPlayer === WhichPlayer.YOU) {
            setWords(battleContext.your_words)
            setWordIdx(battleContext.your_wordIdx)
            setGridColourState(battleContext.your_gridColourState)
        } else if (whichPlayer === WhichPlayer.OPP) {
            setWords(battleContext.opponent_words)
            setWordIdx(battleContext.opponent_wordIdx)
            setGridColourState(battleContext.opponent_gridColourState)
        } else {
            throw new Error("should not reach here")
        }
    }, [whichPlayer, wordleContext, battleContext])

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
    switch(gridColourState[rowPos][squarePos]) {
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