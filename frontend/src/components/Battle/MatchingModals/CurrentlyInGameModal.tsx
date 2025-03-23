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
import { Game } from "@/types/Battle"
import { useUserContext } from "@/contexts/UserContext"
import { useNavigate } from "react-router-dom"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export function CurrentlyInGameModal() {
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
    const { isCurrentlyInGameModalOpen, setIsCurrentlyInGameModalOpen } = useMatchingContext()
    const [game, setGame] = useState<Game | null>(null)
    const [roomId, setRoomId] = useState<String>("")
    const [opponentName, setOpponentName] = useState<String>("")
    const { email } = useUserContext()
    const navigate = useNavigate()

    /*
    Initialise game information
    */
    useEffect(() => {
        const init = async () => {
            const id: String | null = await getPlayerRoomId(email)
            if (!id) {
                throw new Error("This should not happen")
            }
            setRoomId(id)

            const g: Game | null = await getGameInfo(id)
            if (!g) {
                throw new Error("This should not happen")
            }
            setGame(g)

            if (email === g.player1Email && g.player2Email) {
                setOpponentName(g.player2Email)
            } else if (email === g.player2Email && g.player1Email) {
                setOpponentName(g.player1Email)
            } else {
                setOpponentName("YOURSELF")
            }
        }
        if (isCurrentlyInGameModalOpen) init()
    }, [email, isCurrentlyInGameModalOpen])

    async function handleLeaveGame() {
        if (isButtonDisabled) return
        
        setIsButtonDisabled(true)
        const removed = await removePlayerFromGame(email)
        
        if (removed) {
            setIsCurrentlyInGameModalOpen(false)
            navigate("/battle")
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