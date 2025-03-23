import {
    Dialog,
    DialogContent,
    DialogDescription
} from "@/components/ui/dialog"
import { useBattleContext } from "@/contexts/BattleContext"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export function GameStartingModal() {
    const { isGameStartingModalOpen, setIsGameStartingModalOpen } = useBattleContext()

    return (
        <Dialog open={isGameStartingModalOpen}>
            <DialogContent className="gap-8" hideClose={true}>
                <VisuallyHidden>
                    <DialogDescription></DialogDescription>
                </VisuallyHidden>
                <div className="text-xl text-center">
                    Starting in..
                </div>
                <div className="text-7xl font-bold text-center">
                    3, 2, 1
                </div>
            </DialogContent>
        </Dialog>

    )
}