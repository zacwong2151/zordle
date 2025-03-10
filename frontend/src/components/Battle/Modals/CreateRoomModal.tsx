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
import { Button } from "@/components/ui/button"
import ReactLoading from 'react-loading'
import { useWordleContext } from "@/contexts/WordleContext"



export function CreateRoomModal() {
    const { isCreateRoomModalOpen, setIsCreateRoomModalOpen } = useWordleContext()

    return (
        <Dialog open={isCreateRoomModalOpen}>
            <DialogContent className="gap-8" hideClose={true}>
                <DialogTitle>Waiting for friend to join room..</DialogTitle>

                <div className="text-6xl font-bold mx-auto">
                    OFGT62
                </div>

                <ReactLoading type="spin" color="blue" width={80} height={80} className="mx-auto" />

                <DialogFooter>
                    <Button 
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => setIsCreateRoomModalOpen(false)}
                    > 
                        Leave room
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>

    )
}