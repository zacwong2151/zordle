import { useState, useEffect } from "react"
import { useParams } from "react-router"
import Grid from "../Grid/Grid"
import Keyboard from "../Keyboard/Keyboard"
import { AreYouReadyModal } from "./PlayingModals/AreYouReadyModal"
import { WaitingForOtherPlayerModal } from "./PlayingModals/WaitingForOtherPlayerModal"
import { GameStartingModal } from "./PlayingModals/GameStartingModal"
import { isRoomIdValid, getPlayerRoomId, getGameInfo } from "@/apis/BattleApis"
import { useNavigate, Link } from "react-router-dom"
import LoadingPage from "../Misc/LoadingPage"
import { useUserContext } from "@/contexts/UserContext"
import { Game } from "@/types/Battle"
import { Button } from "../ui/button"
import { ExitGameModal } from "./PlayingModals/ExitGameModal"
import { useBattleContext } from "@/contexts/BattleContext"

export default function BattlePage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const { email } = useUserContext()
    const { setIsExitGameModalOpen, setRoomId } = useBattleContext()

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

            const bool: boolean = await isRoomIdValid(id)
            if (!bool) { // roomId does not exist in DB
                navigate("/battle")
                return
            }

            const playerRoomId: String | null = await getPlayerRoomId(email)
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
                                Player 1
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
                                Player 2
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Game Area */}
                <div className="flex justify-between w-full max-w-6xl relative mt-4">
                    {/* Left Side with Player 1 Grid */}
                    <div className="flex flex-col items-center w-[45%]">
                        {/* Grid will go here */}
                        <div className="w-full aspect-square">
                            {/* <Grid /> */}
                        </div>
                    </div>

                    {/* Divider Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-400" />

                    {/* Right Side with Player 2 Grid */}
                    <div className="flex flex-col items-center w-[45%]">
                        {/* Grid will go here */}
                        <div className="w-full aspect-square">
                            {/* <Grid /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}