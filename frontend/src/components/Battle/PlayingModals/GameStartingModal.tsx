import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog"
import { useBattleContext } from "@/contexts/BattleContext"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useEffect, useState } from "react"

export function GameStartingModal() {
    const { 
        isGameStartingModalOpen, 
        setIsGameStartingModalOpen,
        setyour_isKeyboardDisabled,
        socket 
    } = useBattleContext()
    const [countdown, setCountdown] = useState<number>(5)

    useEffect(() => {
        if (!socket) return

        socket.on('countdown', (countdown: number) => {
            setCountdown(countdown)
            if (countdown === 0) {
                setyour_isKeyboardDisabled(false)
                setIsGameStartingModalOpen(false)
                socket.emit('start-timer')
                // TODO: make a PUT request to db to change atReadyPage to false
            }
        })

        return () => {
            socket.off('countdown')
        }
    }, [socket])    


    return (
        <Dialog open={isGameStartingModalOpen}>
            <DialogContent className="gap-8" hideClose={true}>
                <VisuallyHidden>
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                </VisuallyHidden>
                <div className="text-xl text-center">
                    Starting in..
                </div>
                <div className="text-7xl font-bold text-center">
                    {countdown}
                </div>
            </DialogContent>
        </Dialog>

    )
}