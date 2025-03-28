import { useState, useEffect } from "react"
import { useParams } from "react-router"
import Grid from "../Grid/Grid"
import Keyboard from "../Keyboard/Keyboard"
import { AreYouReadyModal } from "./PlayingModals/AreYouReadyModal"
import { WaitingForOtherPlayerModal } from "./PlayingModals/WaitingForOtherPlayerModal"
import { GameStartingModal } from "./PlayingModals/GameStartingModal"
import { isGameIdValid, getPlayerRoomId, getGameInfo } from "@/apis/BattleApis"
import { useNavigate, Link } from "react-router-dom"
import LoadingPage from "../Misc/LoadingPage"
import { useUserContext } from "@/contexts/UserContext"
import { Game, WhichPlayer } from "@/types/BattleTypes"
import { Button } from "../ui/button"
import { ExitGameModal } from "./PlayingModals/ExitGameModal"
import { useBattleContext } from "@/contexts/BattleContext"

export default function BattlePage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const { email } = useUserContext()
    const {
        setIsExitGameModalOpen,
        setRoomId,
        selectedWord,

        your_words, setyour_words,
        your_wordIdx, setyour_wordIdx,
        your_gridColourState, setyour_gridColourState,
        your_keyboardColourState, setyour_keyboardColourState,
        your_isGameOver, setyour_isGameOver,
        your_popupMessage, setyour_popupMessage,
        your_triggerWordShakeAnimation, setyour_triggerWordShakeAnimation,
        your_triggerLettersFlipAnimation, setyour_triggerLettersFlipAnimation,
        your_isKeyboardDisabled, setyour_isKeyboardDisabled,
        opponent_words, 
        opponent_wordIdx, 
        opponent_gridColourState, 
        opponent_triggerLettersFlipAnimation, 
    } = useBattleContext()

    /*
        Verify if user can enter this room. Then, load game info.
    */
    useEffect(() => {
        const init = async () => {
            /*
                Verify user authentication
            */

            if (!email) {
                return // wait for email to be initialised
            }

            if (!id) { // empty id
                navigate("/battle")
                return
            }
            setRoomId(id)

            const bool: boolean = await isGameIdValid(id)
            if (!bool) { // gameId does not exist in DB
                navigate("/battle")
                return
            }

            const playerRoomId: string | null = await getPlayerRoomId(email)
            if (playerRoomId !== id) { // not authenticated to enter this room
                navigate("/battle")
                return
            }

            /*
                Load game info
            */

            const game: Game | null = await getGameInfo(id)
            if (!game) {
                navigate("/battle")
                return
            }

            console.log(game)

            setIsLoading(false)
        }
        init()
    }, [email, id])

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <>
            <ExitGameModal />
            <AreYouReadyModal />
            <WaitingForOtherPlayerModal />
            <GameStartingModal />

            <div className="min-h-screen flex flex-col items-center">
                {/* Top Bar with Exit Game Button, Player Names and Timer */}
                <div className="w-full relative">
                    {/* Exit Game Button - Positioned at top left */}
                    <div className="absolute left-4 top-4">
                        <Button
                            className="bg-red-600 text-white px-4 py-2"
                            onClick={() => setIsExitGameModalOpen(true)}
                        >
                            Exit Game
                        </Button>
                    </div>

                    {/* Content Row with Player Names and Timer */}
                    <div className="flex justify-center items-center mt-4">
                        {/* Left Player Name */}
                        <div className="flex-1 flex justify-center">
                            <div className="bg-gray-200 px-6 py-2 text-lg font-medium">
                                You
                            </div>
                        </div>

                        {/* Timer - Centered */}
                        <div className="mx-12">
                            <div className="border border-gray-400 px-10 py-4 text-center">
                                <span className="text-4xl font-bold">0:00</span>
                            </div>
                        </div>

                        {/* Right Player Name */}
                        <div className="flex-1 flex justify-center">
                            <div className="bg-gray-200 px-6 py-2 text-lg font-medium">
                                Opponent
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Game Area */}
                <div className="flex justify-between w-full max-w-6xl relative mt-4">
                    {/* Left Side with Your Grid */}
                    <div className="flex flex-col items-center w-[45%]">
                        {/* Grid will go here */}
                        <div className="w-full aspect-square">
                            <Grid
                                words={your_words}
                                wordIdx={your_wordIdx}
                                selectedWord={selectedWord}
                                gridColourState={your_gridColourState}
                                triggerWordShakeAnimation={your_triggerWordShakeAnimation}
                                triggerLettersFlipAnimation={your_triggerLettersFlipAnimation}
                                popupMessage={your_popupMessage}
                            />
                            <Keyboard
                                words={your_words}
                                setWords={setyour_words}
                                wordIdx={your_wordIdx}
                                setWordIdx={setyour_wordIdx}
                                selectedWord={selectedWord}
                                gridColourState={your_gridColourState}
                                setGridColourState={setyour_gridColourState}
                                keyboardColourState={your_keyboardColourState}
                                setKeyboardColourState={setyour_keyboardColourState}
                                isGameOver={your_isGameOver}
                                setIsGameOver={setyour_isGameOver}
                                popupMessage={your_popupMessage}
                                setPopupMessage={setyour_popupMessage}
                                triggerWordShakeAnimation={your_triggerWordShakeAnimation}
                                setTriggerWordShakeAnimation={setyour_triggerWordShakeAnimation}
                                triggerLettersFlipAnimation={your_triggerLettersFlipAnimation}
                                setTriggerLettersFlipAnimation={setyour_triggerLettersFlipAnimation}
                                isKeyboardDisabled={your_isKeyboardDisabled}
                                setIsKeyboardDisabled={setyour_isKeyboardDisabled}
                            />
                        </div>
                    </div>

                    {/* Divider Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-400" />

                    {/* Right Side with Player 2 Grid */}
                    <div className="flex flex-col items-center w-[45%]">
                        {/* Grid will go here */}
                        <div className="w-full aspect-square">
                            <Grid
                                words={opponent_words}
                                wordIdx={opponent_wordIdx}
                                selectedWord={selectedWord}
                                gridColourState={opponent_gridColourState}
                                triggerWordShakeAnimation={false}
                                triggerLettersFlipAnimation={opponent_triggerLettersFlipAnimation}
                                popupMessage={null}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}