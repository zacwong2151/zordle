import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useMatchingContext } from "@/contexts/MatchingContext"
import { getGameInfo, removePlayerFromGame, getPlayerRoomId } from "@/apis/BattleApis"
import { useState, useEffect } from "react"
import { Game } from "@/types/BattleTypes"
import { useUserContext } from "@/contexts/UserContext"
import { useNavigate } from "react-router-dom"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useBattleContext } from "@/contexts/BattleContext"

type JSONResponse = {
    success: boolean
}

export function CurrentlyInGameModal() {
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
    const { isCurrentlyInGameModalOpen, setIsCurrentlyInGameModalOpen } = useMatchingContext()
    const { socket, setSocket } = useBattleContext()
    const [roomId, setRoomId] = useState<string>("")
    const [opponentName, setOpponentName] = useState<string>("")
    const { email } = useUserContext()
    const navigate = useNavigate()

    /*
    Initialise game information
    */
    useEffect(() => {
        const init = async () => {
            if (!socket) return

            const roomId: string | null = await getPlayerRoomId(email)
            if (!roomId) {
                throw new Error("This should not happen")
            }
            setRoomId(roomId)

            const game: Game | null = await getGameInfo(roomId)
            if (!game) {
                throw new Error("This should not happen")
            }
            socket.emit('create-room', roomId) // connect to server to clean up server properly upon leaving game

            if (email === game.player1Email && game.player2Email) {
                setOpponentName(game.player2Email)
            } else if (email === game.player2Email && game.player1Email) {
                setOpponentName(game.player1Email)
            } else {
                setOpponentName("YOURSELF")
            }
        }
        if (isCurrentlyInGameModalOpen) init()
    }, [email, isCurrentlyInGameModalOpen, socket])

    async function handleLeaveGame() {
        if (isButtonDisabled) return

        setIsButtonDisabled(true)
        const removed = await removePlayerFromGame(email)

        if (removed && socket) {
            socket.emit('exit-game', email, (response: JSONResponse) => { // wait for ack
                if (response.success) {
                    socket.disconnect()
                    setSocket(null)

                    setIsCurrentlyInGameModalOpen(false)
                    navigate("/battle")
                }
            })
        } else {
            setIsButtonDisabled(false)
            console.warn("reached here")
        }

    }

    function handleResumeGame() {
        if (isButtonDisabled) return

        setIsButtonDisabled(true)
        setIsCurrentlyInGameModalOpen(false)
        navigate(`/battle/${roomId}`)
    }

    return (
        <Dialog open={isCurrentlyInGameModalOpen}>
            <DialogContent className="gap-8" hideClose={true}>
                <VisuallyHidden>
                    <DialogDescription></DialogDescription>
                </VisuallyHidden>
                <DialogTitle>
                    You are currently in a game with <b>{opponentName}</b>
                </DialogTitle>

                <DialogFooter>
                    <div className="flex justify-between w-full">
                        <Button
                            className="bg-red-600 hover:brightness-75"
                            disabled={isButtonDisabled}
                            onClick={handleLeaveGame}
                        >
                            Leave game
                        </Button>
                        <Button
                            className="bg-green-600 hover:brightness-75"
                            disabled={isButtonDisabled}
                            onClick={handleResumeGame}
                        >
                            Resume game
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}