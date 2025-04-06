import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog"
import { useBattleContext } from "@/contexts/BattleContext"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useEffect } from "react"
import { useUserContext } from "@/contexts/UserContext"

export function WaitingForOtherPlayerModal() {
    const { email } = useUserContext()
    const { 
        isWaitingForOtherPlayerModalOpen, setIsWaitingForOtherPlayerModalOpen,
        setIsGameStartingModalOpen,
        socket
    } = useBattleContext()
    
    // Tell server that you are ready to play
    useEffect(() => {
        if (isWaitingForOtherPlayerModalOpen && socket) {
            socket.emit('ready-to-play', email)
        }
    }, [isWaitingForOtherPlayerModalOpen, socket])

    // When both players are ready, bring the player to GameStartingModal
    useEffect(() => {
        if (!socket) return

        socket.on('both-players-ready', () => {
            setIsWaitingForOtherPlayerModalOpen(false)
            setIsGameStartingModalOpen(true)
        })

        return () => {
            socket.off('both-players-ready')
        }
    }, [socket])

    return (
        <Dialog open={isWaitingForOtherPlayerModalOpen}>
            <DialogContent className="gap-8" hideClose={true}>
                <VisuallyHidden>
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                </VisuallyHidden>
                <div className="text-3xl font-bold text-center">
                    Waiting for other player to be ready..
                </div>
            </DialogContent>
        </Dialog>

    )
}