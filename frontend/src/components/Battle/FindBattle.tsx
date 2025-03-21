import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FindbattleNavbar from "../Main/FindbattleNavbar"
import { CreateRoomModal } from "./MatchingModals/CreateRoomModal"
import { JoinRoomModal } from "./MatchingModals/JoinRoomModal"
import { InvalidRoomModal } from "./MatchingModals/InvalidRoomModal"
import { CurrentlyInGameModal } from "./MatchingModals/CurrentlyInGameModal"
import { isUserFindingGame, removeUserFromFinding, initialiseFinding } from "@/apis/MatchingApis"
import { isUserInGame } from "@/apis/BattleApis"
import { useUserContext } from "@/contexts/UserContext"
import { generateUniqueRoomId } from "@/utils/BattleUtils"
import { useMatchingContext } from "@/contexts/MatchingContext"
import LoadingPage from "../Misc/LoadingPage"

export default function FindBattle() {
    const {
        setIsCreateRoomModalOpen, 
        setIsJoinRoomModalOpen, 
        setIsInvalidRoomModalOpen, 
        setIsCurrentlyInGameModalOpen,
        isCurrentlyInGameModalOpen
    } = useMatchingContext()
    const [roomId, setRoomId] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { email } = useUserContext()

    /*
        Check if user is currently finding game or playing game
    */
    useEffect(() => {
        const validation = async () => {
            try {
                if (await isUserFindingGame(email)) {
                    await removeUserFromFinding(email)
                }
                if (await isUserInGame(email)) {
                    setIsCurrentlyInGameModalOpen(true)
                }
                setIsLoading(false)
            } catch (error) {
                console.error(error)                
            }
        }
        if (email) validation()
    }, [email])

    const handleCreateRoom = async () => {
        const bool = await isUserFindingGame(email) || await isUserInGame(email)
        if (bool) {
            console.warn('this should not happen')
            return
        }
        await initialiseFinding(email, generateUniqueRoomId())
        setIsCreateRoomModalOpen(true)
    }

    const handleJoinRoom = () => {
        setIsJoinRoomModalOpen(true)
    }

    const handleRoomIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const roomId = e.target.value.toUpperCase()
        if (roomId.length <= 6) {
            setRoomId(roomId)
        }
    }

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <>
            <CreateRoomModal />
            <JoinRoomModal roomId={roomId} />
            <InvalidRoomModal />
            <CurrentlyInGameModal />

            <div className="flex flex-col min-h-screen">
                <FindbattleNavbar />
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
                                onChange={(e) => handleRoomIdChange(e)}
                                className="w-48 h-16 !text-2xl"
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

