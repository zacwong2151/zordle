import {
    Dialog,
    DialogDescription,
    DialogContent,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useMatchingContext } from "@/contexts/MatchingContext"

export function InvalidRoomModal() {
    const { isInvalidRoomModalOpen, setIsInvalidRoomModalOpen } = useMatchingContext()

    return (
        <Dialog open={isInvalidRoomModalOpen}>
            <DialogContent className="gap-16" hideClose={true}>
                <DialogTitle>
                    This room ID does not exist!
                </DialogTitle>
                <DialogDescription></DialogDescription>

                <DialogFooter>
                    <Button 
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => setIsInvalidRoomModalOpen(false)}
                    > 
                        Back
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}