import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import NavBar from "../Main/NavBar"
import { CreateRoomModal } from "./MatchingModals/CreateRoomModal"
import { JoinRoomModal } from "./MatchingModals/JoinRoomModal"
import { InvalidRoomModal } from "./MatchingModals/InvalidRoomModal"
import { useWordleContext } from "@/contexts/WordleContext"
import { isUserFindingGame, userIsFindingGame } from "@/apis/MatchingApis"
import { isUserInGame } from "@/apis/BattleApis"
import { useUserContext } from "@/contexts/UserContext"
import { generateUniqueRoomId } from "@/utils/BattleUtils"

export default function FindBattle() {
    const {
        setIsCreateRoomModalOpen,
        setIsJoinRoomModalOpen,
        setIsInvalidRoomModalOpen
    } = useWordleContext()
    const [roomId, setRoomId] = useState<string>("")
    const { email } = useUserContext()

    const handleCreateRoom = async () => {
        const bool = await isUserFindingGame(email) // || isUserInGame(email)
        if (bool) {
            console.warn('this should not happen')
            return
        }
        await userIsFindingGame(email, generateUniqueRoomId())
        setIsCreateRoomModalOpen(true)
    }

    const handleJoinRoom = () => {
        setIsJoinRoomModalOpen(true)
    }

    return (
        <>
            <CreateRoomModal />
            <JoinRoomModal roomId={roomId} />
            <InvalidRoomModal />

            <div className="flex flex-col min-h-screen">
                <NavBar />
                <div className="grid grid-cols-2 items-center w-full max-w-6xl mx-auto flex-grow relative">
                    <div className="flex flex-col items-center gap-6">
                        <div className="text-2xl font-medium">Create a room and ask a friend to join!</div>
                        <Button onClick={handleCreateRoom} className="rounded-full px-8 py-3 text-base h-auto">
                            Create room
                        </Button>
                    </div>

                    {/* Vertical Line */}
                    <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gray-300 transform -translate-x-1/2"></div>

                    <div className="flex flex-col items-center gap-6">
                        <div className="text-2xl font-medium">Join a friend's room!</div>
                        <div className="flex gap-4 items-center">
                            <Input
                                placeholder="Room code"
                                value={roomId}
                                onChange={(e) => setRoomId(e.target.value)}
                                className="w-32 h-10"
                            />
                            <Button onClick={handleJoinRoom} className="rounded-full px-8 py-3 text-base h-auto">
                                Join room
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

