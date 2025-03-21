import {
    Dialog,
    DialogContent,
    DialogDescription
} from "@/components/ui/dialog"
import { useBattleContext } from "@/contexts/BattleContext"

export function WaitingForOtherPlayerModal() {
    const { isWaitingForOtherPlayerModalOpen, setIsWaitingForOtherPlayerModalOpen } = useBattleContext()

    return (
        <Dialog open={isWaitingForOtherPlayerModalOpen}>
            <DialogContent className="py-16 max-w-md" hideClose={true}>
                <DialogDescription></DialogDescription>
                <div className="text-3xl font-bold text-center">
                    Waiting for other player to be ready..
                </div>
            </DialogContent>
        </Dialog>

    )
}