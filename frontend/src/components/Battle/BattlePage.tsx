import { useParams } from "react-router"
import Grid from "../Grid/Grid"
import Keyboard from "../Keyboard/Keyboard"
import { AreYouReadyModal } from "./PlayingModals/AreYouReadyModal"
import { WaitingForOtherPlayerModal } from "./PlayingModals/WaitingForOtherPlayerModal"
import { GameStartingModal } from "./PlayingModals/GameStartingModal"

export default function BattlePage() {
    const { roomId } = useParams()

    /*
        TODO:
        1. upon page render, check if this roomId is in db. If its not, return to HomePage
        2. If yes, check if this user belongs to this roomId, if not, return to HomePage
    */

    return (
        <>
            <AreYouReadyModal />
            <WaitingForOtherPlayerModal />
            <GameStartingModal />

            <div className="min-h-screen flex flex-col items-center">
                <div className="w-full max-w-6xl flex items-center mb-6 px-4">
                    {/* Left Player Name */}
                    <div className="w-[45%] flex justify-center mt-4">
                        <div className="bg-gray-200 px-6 py-2 text-lg font-medium">You</div>
                    </div>

                    {/* Timer */}
                    <div className="border border-gray-400 px-8 py-4">
                        <span className="text-4xl font-bold">0:00</span>
                    </div>

                    {/* Right Player Name */}
                    <div className="w-[45%] flex justify-center mt-4">
                        <div className="bg-gray-200 px-6 py-2 text-lg font-medium">Other player</div>
                    </div>
                </div>

                <div className="flex justify-between w-full max-w-6xl relative">
                    {/* Left Side with Player 1 */}
                    <div className="flex flex-col items-center w-full max-w-[45%] gap-y-4">
                        <Grid />
                        <Keyboard />
                    </div>

                    {/* Divider Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-300" />

                    {/* Right Side with Player 2 */}
                    <div className="flex flex-col items-center w-full max-w-[45%]">
                        <Grid />
                    </div>
                </div>
            </div>
        </>
    )
}