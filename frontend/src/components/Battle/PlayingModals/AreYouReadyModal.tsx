import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { useWordleContext } from "@/contexts/WordleContext"
import { Button } from "@/components/ui/button"

export function AreYouReadyModal() {
    // const { isJoinRoomModalOpen, setIsJoinRoomModalOpen } = useWordleContext()

    return (
        <Dialog open={false}>
            <DialogContent className="" hideClose={true}>
                <div className="text-3xl font-bold flex justify-center mt-8 mb-16">
                    Are you ready?
                </div>
                <Button className="mx-auto">
                    Ready
                </Button>
            </DialogContent>
        </Dialog>

    )
}