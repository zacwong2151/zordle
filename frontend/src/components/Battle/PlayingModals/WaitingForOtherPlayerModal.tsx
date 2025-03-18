import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { useWordleContext } from "@/contexts/WordleContext"

export function WaitingForOtherPlayerModal() {
    // const { isJoinRoomModalOpen, setIsJoinRoomModalOpen } = useWordleContext()

    return (
        <Dialog open={false}>
            <DialogContent className="py-16 max-w-md" hideClose={true}>
                <div className="text-3xl font-bold text-center">
                    Waiting for other player to be ready..
                </div>
            </DialogContent>
        </Dialog>

    )
}