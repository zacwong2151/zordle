import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { useWordleContext } from "@/contexts/WordleContext"

export function GameStartingModal() {
    // const { isJoinRoomModalOpen, setIsJoinRoomModalOpen } = useWordleContext()

    return (
        <Dialog open={false}>
            <DialogContent className="py-16 max-w-md " hideClose={true}>
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