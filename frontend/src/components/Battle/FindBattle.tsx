import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import NavBar from "../Main/NavBar"
import { CreateRoomModal } from "./Modals/CreateRoomModal"
import { JoinRoomModal } from "./Modals/JoinRoomModal"
import { InvalidRoomModal } from "./Modals/InvalidRoomModal"
import { useWordleContext } from "@/contexts/WordleContext"

export default function FindBattle() {
    const {
        setIsCreateRoomModalOpen,
        setIsJoinRoomModalOpen,
        setIsInvalidRoomModalOpen
    } = useWordleContext()
    const [roomCode, setRoomCode] = useState("")

    const handleCreateRoom = () => {
        setIsCreateRoomModalOpen(true)
        /*
            TODO: 
            1. generate a random 6-digit room ID
            2. create a WebSocket connection between client and server
            3. listen for event where another client connects to the same room
        */
    }

    const handleJoinRoom = () => {
        setIsJoinRoomModalOpen(true)
        /*
            TODO:
            1. check if this room ID belongs in the database
              1.1 if yes, check if this room ID is full (has 2 persons)
                1.1.1 if yes, open InvalidRoomModal
                1.1.2 if no, open JoinRoomModal
              1.2 if no, open InvalidRoomModal
        */
    }

    return (
        <>  
            <CreateRoomModal />
            <JoinRoomModal />
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
                                value={roomCode}
                                onChange={(e) => setRoomCode(e.target.value)}
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

