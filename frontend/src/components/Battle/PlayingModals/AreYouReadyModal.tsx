import {
    Dialog,
    DialogContent,
    DialogDescription
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useBattleContext } from "@/contexts/BattleContext"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export function AreYouReadyModal() {
    const { isAreYouReadyModalOpen, setIsAreYouReadyModalOpen } = useBattleContext()

    function handleReady() {

    }
    
    return (
        <Dialog open={isAreYouReadyModalOpen}>
            <DialogContent className="gap-8" hideClose={true}>
                <VisuallyHidden>
                    <DialogDescription></DialogDescription>
                </VisuallyHidden>
                <div className="text-3xl font-bold flex justify-center">
                    Are you ready?
                </div>
                <Button 
                    className="mx-auto"
                    onClick={handleReady}
                >
                    Ready
                </Button>
            </DialogContent>
        </Dialog>

    )
}