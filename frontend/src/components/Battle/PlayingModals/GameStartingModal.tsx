import {
    Dialog,
    DialogContent,
    DialogDescription
} from "@/components/ui/dialog"
import { useBattleContext } from "@/contexts/BattleContext"

export function GameStartingModal() {
    const { isGameStartingModalOpen, setIsGameStartingModalOpen } = useBattleContext()

    return (
        <Dialog open={isGameStartingModalOpen}>
            <DialogContent className="py-16 max-w-md " hideClose={true}>
                <DialogDescription></DialogDescription>
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