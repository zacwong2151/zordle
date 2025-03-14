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
import { useWordleContext } from "@/contexts/WordleContext"

export function InvalidRoomModal() {
    const { isInvalidRoomModalOpen, setIsInvalidRoomModalOpen } = useWordleContext()

    return (
        <Dialog open={isInvalidRoomModalOpen}>
            <DialogContent className="gap-16" hideClose={true}>
                <DialogTitle>
                    This room ID does not exist!
                </DialogTitle>

                <DialogFooter>
                    <Button 
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => setIsInvalidRoomModalOpen(false)}
                    > 
                        back
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}