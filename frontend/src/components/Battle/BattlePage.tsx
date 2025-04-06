import { useState, useEffect } from "react"
import { useParams } from "react-router"
import Grid from "../Grid/Grid"
import Keyboard from "../Keyboard/Keyboard"
import { AreYouReadyModal } from "./PlayingModals/AreYouReadyModal"
import { WaitingForOtherPlayerModal } from "./PlayingModals/WaitingForOtherPlayerModal"
import { GameStartingModal } from "./PlayingModals/GameStartingModal"
import { isGameIdValid, getPlayerRoomId, getGameInfo } from "@/apis/BattleApis"
import { useNavigate } from "react-router-dom"
import LoadingPage from "../Misc/LoadingPage"
import { useUserContext } from "@/contexts/UserContext"
import { Game } from "@/types/BattleTypes"
import { Button } from "../ui/button"
import { ExitGameModal } from "./PlayingModals/ExitGameModal"
import { useBattleContext } from "@/contexts/BattleContext"
import { DEFAULT_WORDS } from "@/contexts/DefaultStates"
import { GridColourState } from "@/types/WordleTypes"
import { triggerLettersFlipAnimation } from "@/utils/WordleUtils"
import { LETTERS_FLIP_ANIMATION_TIME } from "@/utils/WordleUtils"

export default function BattlePage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { email } = useUserContext()

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [time, setTime] = useState<number>(0)

    const minutes = new String(Math.floor(time / 60))
    let seconds = new String(time % 60)
    if ((time % 60) < 10) {
        seconds = "0" + seconds
    }

    const {
        roomId, setRoomId,
        setIsWaitingForOtherPlayerModalOpen,
        setIsExitGameModalOpen,

        player1Email, setPlayer1Email,
        player2Email, setPlayer2Email,
        isPlayer1Ready, setIsPlayer1Ready,
        isPlayer2Ready, setIsPlayer2Ready,
        atReadyPage, setAtReadyPage,

        selectedWord, setSelectedWord,
        timer, setTimer,

        your_words, setyour_words,
        your_wordIdx, setyour_wordIdx,
        your_gridColourState, setyour_gridColourState,
        your_keyboardColourState, setyour_keyboardColourState,
        your_isGameOver, setyour_isGameOver,
        your_popupMessage, setyour_popupMessage,
        your_triggerWordShakeAnimation, setyour_triggerWordShakeAnimation,
        your_triggerLettersFlipAnimation, setyour_triggerLettersFlipAnimation,
        your_isKeyboardDisabled, setyour_isKeyboardDisabled,
        // opponent_words, setopponent_words,
        opponent_wordIdx, setopponent_wordIdx,
        opponent_gridColourState, setopponent_gridColourState,
        opponent_triggerLettersFlipAnimation, setopponent_triggerLettersFlipAnimation,

        socket
    } = useBattleContext()

    /*
        Verify if user can enter this room. Then, load game info.
    */
    useEffect(() => {
        const init = async () => {
            /*
                Verify user authentication
            */

            if (!email || !socket) {
                return // wait for email and socket to be initialised
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

            setSelectedWord(game.selectedWord)
            setPlayer1Email(game.player1Email ?? "")
            setPlayer2Email(game.player2Email ?? "")
            setAtReadyPage(game.atReadyPage)

            if (game.player1Email === email) {
                setyour_words(game.player1_words)
                setyour_wordIdx(game.player1_wordIdx)
                setyour_gridColourState(game.player1_gridColourState)
                setyour_keyboardColourState(game.player1_keyboardColourState)
                setyour_isGameOver(game.player1_isGameOver)

                setopponent_wordIdx(game.player2_wordIdx)
                setopponent_gridColourState(game.player2_gridColourState)

            } else if (game.player2Email === email) { // you are player 2
                setyour_words(game.player2_words)
                setyour_wordIdx(game.player2_wordIdx)
                setyour_gridColourState(game.player2_gridColourState)
                setyour_keyboardColourState(game.player2_keyboardColourState)
                setyour_isGameOver(game.player2_isGameOver)

                setopponent_wordIdx(game.player1_wordIdx)
                setopponent_gridColourState(game.player1_gridColourState)

            } else {
                throw new Error("should not reach here")
            }

            socket.emit('create-room', id)

            if (game.atReadyPage) {
                setyour_isKeyboardDisabled(true)
                setIsWaitingForOtherPlayerModalOpen(true)
            } else {
                socket.emit('start-timer') // only reach here if page is refreshed. If normal game, emit 'start-timer' at GameStartingModal
            }

            setIsLoading(false)

        }
        init()

        // TODO: stop timer when the game is deleted
    }, [email, id, socket])

    useEffect(() => {
        if (!socket) return

        // Received opponent's grid
        socket.on('update-grid-colour', (newGridColourState: GridColourState[][]) => {
            setopponent_gridColourState(newGridColourState)
            triggerLettersFlipAnimation(setopponent_triggerLettersFlipAnimation)

            setTimeout(() => {
                setopponent_wordIdx(prevIdx => prevIdx + 1)
            }, LETTERS_FLIP_ANIMATION_TIME)
        })

        // Receive new time
        socket.on('update-time', (time: number) => {
            setTime(time)
        })

        return () => {
            socket.off('update-grid-colour')
            socket.off('update-time')
        }
    }, [socket])


    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <>
            <ExitGameModal />
            <AreYouReadyModal />
            <WaitingForOtherPlayerModal />
            <GameStartingModal />

            <div className="flex flex-col">
                {/* Top Bar */}
                <div className="relative">
                    {/* position absolute - Exit Game Button */}
                    <div className="absolute left-4 top-4">
                        <Button
                            className="bg-red-600 text-white px-4 py-2"
                            onClick={() => setIsExitGameModalOpen(true)}
                        >
                            Exit Game
                        </Button>
                    </div>

                    {/* position absolute - Timer */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-4">
                        <div className="border border-gray-400 px-10 py-4 text-center">
                            <span className="text-4xl font-bold">{`${minutes}:${seconds}`}</span>
                        </div>
                    </div>

                    {/* Player Names */}
                    <div className="grid grid-cols-2 items-center mt-4">
                        {/* Left Player Name */}
                        <div className="flex justify-center">
                            <div className="bg-gray-200 px-6 py-2 text-lg font-medium">
                                You
                            </div>
                        </div>

                        {/* Right Player Name */}
                        <div className="flex justify-center">
                            <div className="bg-gray-200 px-6 py-2 text-lg font-medium">
                                Opponent
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    {/* position absolute - Divider Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-400 mt-8" />

                    {/* Left and Right sides */}
                    <div className="grid grid-cols-2 mt-6">
                        {/* Left side */}
                        <div className="flex flex-col items-center justify-center gap-4">
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
                                socket={socket}
                                youArePlayerOne={player1Email === email}
                                roomId={roomId}
                            />
                        </div>

                        {/* Right Side */}
                        <div className="flex flex-col items-center">
                            <Grid
                                words={DEFAULT_WORDS}
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