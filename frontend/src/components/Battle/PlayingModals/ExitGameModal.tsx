import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useBattleContext } from "@/contexts/BattleContext"
import { useUserContext } from "@/contexts/UserContext"
import { removePlayerFromGame } from "@/apis/BattleApis"
import { useNavigate } from "react-router-dom"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export function ExitGameModal() {
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
    const { roomId, isExitGameModalOpen, setIsExitGameModalOpen } = useBattleContext()
    const { email } = useUserContext()
    const navigate = useNavigate()

    async function handleExitGame() {
        if (isButtonDisabled) return
        
        setIsButtonDisabled(true)
        const removed = await removePlayerFromGame(email)
        
        if (removed) {
            setIsExitGameModalOpen(false)
            navigate("/battle")
        } else {
            setIsButtonDisabled(false)
            console.warn("reached here")
        }
    }

    return (
        <Dialog open={isExitGameModalOpen}>
            <DialogContent className="gap-8" hideClose={true}>
                <VisuallyHidden>
                    <DialogDescription></DialogDescription>
                </VisuallyHidden>
                <DialogTitle>
                    Are you sure?
                </DialogTitle>

                <DialogFooter>
                    <Button onClick={() => setIsExitGameModalOpen(false)}>
                        Cancel
                    </Button>
                    <Link to="/battle">
                        <Button 
                            className="bg-red-600 hover:bg-red-700"
                            onClick={handleExitGame}
                            disabled={isButtonDisabled}
                        > 
                            Exit Game
                        </Button>
                    </Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}