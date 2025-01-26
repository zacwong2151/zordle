import { IoMdRefresh } from "react-icons/io";
import { useWordleContext } from "../contexts/WordleContext";
import { getRandomWord } from "../apis/WordleApi";
import { Letter } from "../types/Letter";
import { KeyboardColourState } from "../types/ColourState";

export default function NavBar() {
    const { 
        setWords, 
        setWordIdx, 
        setSelectedWord, 
        setGridColourState, 
        setKeyboardColourState, 
        setIsGameOver,
        setPopupMessage,
        setTriggerWordShakeAnimation,
        setTriggerLettersFlipAnimation,
        setIsKeyboardDisabled,
    } = useWordleContext()

    /**
     * Resets all state to default state.
     */
    async function handleRefresh() {
        setWords(["", "", "", "", "", ""])
        setWordIdx(0)

        const word = await getRandomWord()
        console.log(`The selected word is ${word}`)
        setSelectedWord(word)

        setGridColourState(
            [
                ['white', 'white', 'white', 'white', 'white'],
                ['white', 'white', 'white', 'white', 'white'],
                ['white', 'white', 'white', 'white', 'white'],
                ['white', 'white', 'white', 'white', 'white'],
                ['white', 'white', 'white', 'white', 'white'],
                ['white', 'white', 'white', 'white', 'white']
            ]
        )
        
        const initialKeyboardState: Record<Letter, KeyboardColourState> = {} as Record<Letter, KeyboardColourState>
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(letter => {
            initialKeyboardState[letter as Letter] = "gray"
        })
        setKeyboardColourState(initialKeyboardState)
        
        setIsGameOver(false)
        setPopupMessage(null)
        setTriggerWordShakeAnimation(false)
        setTriggerLettersFlipAnimation(false)
        setIsKeyboardDisabled(false)
    }

    return (
        <nav className="bg-slate-200 text-gray-800 p-4 w-full border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-center h-8 cursor-pointer">
            <IoMdRefresh size={24} className="hover:text-blue-600" onClick={handleRefresh} />
          </div>
        </nav>
    )
}