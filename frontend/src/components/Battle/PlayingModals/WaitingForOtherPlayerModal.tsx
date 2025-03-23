import {
    Dialog,
    DialogContent,
    DialogDescription
} from "@/components/ui/dialog"
import { useBattleContext } from "@/contexts/BattleContext"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export function WaitingForOtherPlayerModal() {
    const { isWaitingForOtherPlayerModalOpen, setIsWaitingForOtherPlayerModalOpen } = useBattleContext()

    return (
        <Dialog open={isWaitingForOtherPlayerModalOpen}>
            <DialogContent className="gap-8" hideClose={true}>
                <VisuallyHidden>
                    <DialogDescription></DialogDescription>
                </VisuallyHidden>
                <div className="text-3xl font-bold text-center">
                    Waiting for other player to be ready..
                </div>
            </DialogContent>
        </Dialog>

    )
}