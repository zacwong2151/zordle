import { IoMdRefresh } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { useWordleContext } from "../../contexts/WordleContext";
import { getRandomWord } from "../../apis/WordleApi";
import { Letter } from "../../types/Letter";
import { KeyboardColourState } from "../../types/ColourState";
import { GiBattleGear } from "react-icons/gi";
import { useNavigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";

export default function NavBar() {
    const navigate = useNavigate()
    const {
        isKeyboardDisabled,
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
        setIsUserStatsModalOpen,
    } = useWordleContext()
    const { user } = useAuth0()

    /**
     * Resets all state to default state.
     */
    async function handleRefresh() {
        if (isKeyboardDisabled) return

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
        setIsUserStatsModalOpen(false)
    }

    const unauthenticatedUserProfile = !user && (
        <div className="absolute right-12 rounded-full bg-slate-300 hover:brightness-90 w-10 h-10 flex items-center justify-center" >
            <CiUser
                className="text-2xl cursor-pointer"
                onClick={() => setIsUserStatsModalOpen(true)}
            />
        </div>
    )

    const authenticatedUserProfile = user && (
        <img
            src={user.picture}
            className="rounded-full absolute right-8 w-10 cursor-pointer hover:brightness-90"
            onClick={() => setIsUserStatsModalOpen(true)}
        />
    )

    return (
        <nav className="bg-slate-200 text-gray-800 p-4 border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-center h-8 gap-x-24">
                <IoMdRefresh size={24} className="hover:text-blue-700 cursor-pointer" onClick={handleRefresh} />
                <GiBattleGear className="hover:text-blue-700 cursor-pointer" onClick={() => navigate('/battle')} />
                {user ? authenticatedUserProfile : unauthenticatedUserProfile}
            </div>
        </nav>
    )
}