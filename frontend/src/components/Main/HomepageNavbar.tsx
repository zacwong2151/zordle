import { IoMdRefresh } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { useWordleContext } from "../../contexts/WordleContext";
import { getRandomWord } from "../../apis/WordleApis";
import { Letter } from "../../types/Letter";
import { KeyboardColourState } from "../../types/ColourState";
import { GiBattleGear } from "react-icons/gi";
import { Link } from "react-router-dom"
import { useUserContext } from "@/contexts/UserContext";
import UserStats from "./UserStats";

const ICON_STYLE = "hover:text-blue-800 cursor-pointer text-xl md:text-2xl"

export default function HomepageNavbar() {
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
    } = useWordleContext()
    const { isAuth, picture, setIsUserStatsModalOpen } = useUserContext()

    /**
     * Resets all state to default state.
     */
    async function handleRefresh() {
        if (isKeyboardDisabled) return
        setIsKeyboardDisabled(true)

        const word = getRandomWord()
        console.log(`The selected word is ${word}`)
        setSelectedWord(word)
        
        setWords(["", "", "", "", "", ""])
        setWordIdx(0)

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
        <div className="absolute right-8 rounded-full bg-slate-300 hover:brightness-90 w-10 h-10 flex items-center justify-center hidden md:block select-none" >
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
            className="rounded-full absolute right-8 w-10 cursor-pointer hover:brightness-90 hidden md:block select-none"
            onClick={() => setIsUserStatsModalOpen(true)}
        />
    )

    return (
        <>
            <UserStats />
            <nav className="bg-slate-200 text-gray-800 p-4 border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-center h-5 md:h-8 gap-x-24">
                    <Link
                        to="/"
                        className={`${ICON_STYLE}`}
                    >
                        <IoHomeOutline />
                    </Link>
                    <IoMdRefresh className={`${ICON_STYLE}`} onClick={handleRefresh} />
                    <Link
                        to="/battle"
                        className={`${ICON_STYLE}`}
                    >
                        <GiBattleGear />
                    </Link>
                    {isAuth ? authenticatedUserProfile : unauthenticatedUserProfile}
                </div>
            </nav>
        </>
    )
}