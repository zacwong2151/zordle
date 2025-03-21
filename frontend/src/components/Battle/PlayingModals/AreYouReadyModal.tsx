import {
    Dialog,
    DialogContent,
    DialogDescription
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useBattleContext } from "@/contexts/BattleContext"

export function AreYouReadyModal() {
    const { isAreYouReadyModalOpen, setIsAreYouReadyModalOpen } = useBattleContext()

    function handleReady() {

    }

    return (
        <Dialog open={isAreYouReadyModalOpen}>
            <DialogContent className="" hideClose={true}>
                <DialogDescription></DialogDescription>
                <div className="text-3xl font-bold flex justify-center mt-6 mb-16">
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