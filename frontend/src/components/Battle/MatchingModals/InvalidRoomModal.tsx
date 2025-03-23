import {
    Dialog,
    DialogDescription,
    DialogContent,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useMatchingContext } from "@/contexts/MatchingContext"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export function InvalidRoomModal() {
    const { isInvalidRoomModalOpen, setIsInvalidRoomModalOpen } = useMatchingContext()

    return (
        <Dialog open={isInvalidRoomModalOpen}>
            <DialogContent className="gap-8" hideClose={true}>
                <VisuallyHidden>
                    <DialogDescription></DialogDescription>
                </VisuallyHidden>
                <DialogTitle>
                    This room ID does not exist!
                </DialogTitle>

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