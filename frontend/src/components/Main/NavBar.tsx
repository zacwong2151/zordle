import { IoMdRefresh } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { useWordleContext } from "../../contexts/WordleContext";
import { getRandomWord } from "../../apis/CoreGameApis";
import { Letter } from "../../types/Letter";
import { KeyboardColourState } from "../../types/ColourState";
import { GiBattleGear } from "react-icons/gi";
import { Link } from "react-router-dom"
import { useUserContext } from "@/contexts/UserContext";
import UserStats from "./UserStats";

export default function NavBar() {
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
    const { isAuth, picture } = useUserContext()

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

    const unauthenticatedUserProfile = !isAuth && (
        <div className="absolute right-8 rounded-full bg-slate-300 hover:brightness-90 w-10 h-10 flex items-center justify-center" >
            <CiUser
                className="text-2xl cursor-pointer"
                onClick={() => setIsUserStatsModalOpen(true)}
            />
        </div>
    )

    const authenticatedUserProfile = isAuth && (
        <img
            src={picture}
            alt="User Profile"
            className="rounded-full absolute right-8 w-10 cursor-pointer hover:brightness-90"
            onClick={() => setIsUserStatsModalOpen(true)}
        />
    )

    return (
        <>
            <UserStats />
            <nav className="bg-slate-200 text-gray-800 p-4 border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-center h-8 gap-x-24">
                    <Link 
                        to="/"
                        className="hover:text-blue-800 cursor-pointer text-2xl"
                    >
                        <IoHomeOutline />
                    </Link>
                    {
                        window.location.pathname === "/" && 
                        <IoMdRefresh className="hover:text-blue-800 cursor-pointer text-2xl" onClick={handleRefresh} />
                    }
                    <Link
                        to="/battle"
                        className="hover:text-blue-800 cursor-pointer text-2xl"
                    >
                        <GiBattleGear />
                    </Link>
                    {isAuth ? authenticatedUserProfile : unauthenticatedUserProfile}
                </div>
            </nav>
        </>
    )
}