import {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog"
import ReactLoading from 'react-loading'
import { useWordleContext } from "@/contexts/WordleContext"

export function JoinRoomModal() {
    const { isJoinRoomModalOpen, setIsJoinRoomModalOpen } = useWordleContext()

    return (
        <Dialog open={isJoinRoomModalOpen} onOpenChange={() => setIsJoinRoomModalOpen(false)}> {/*To remove the onOpenChange part*/}
            <DialogContent className="gap-8" hideClose={true}>
                <DialogTitle>Joining room..</DialogTitle>
                
                <div className="text-6xl font-bold mx-auto">
                    OFGT62
                </div>

                <ReactLoading type="spin" color="blue" width={80} height={80} className="mx-auto mb-8" />

            </DialogContent>
        </Dialog>

    )
}