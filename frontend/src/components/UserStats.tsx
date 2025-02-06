import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useNavigate } from "react-router-dom"
import { useWordleContext } from "@/contexts/WordleContext"

export default function UserStats() {
    const { isUserStatsModalOpen, setIsUserStatsModalOpen } = useWordleContext()
    const navigate = useNavigate()
    return (
        <Dialog open={isUserStatsModalOpen} onOpenChange={() => setIsUserStatsModalOpen(false)}>
            <DialogContent className="sm:max-w-md">
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
                <div className="flex flex-col items-center space-y-6 text-center">
                    <img
                        src="/zordle-icon-thick-border.png"
                        alt="Wordle Logo"
                        className="h-16 w-16"
                    />
                    <h2 className="text-2xl font-bold">Wordle</h2>
                    <p className="text-xl">
                        Want to start tracking
                        <br />
                        your stats and streaks?
                    </p>
                    <Button
                        className="w-3/4 text-base bg-black text-white rounded-3xl"
                        size="lg"
                        onClick={() => {
                            navigate("/signup")
                            setIsUserStatsModalOpen(false)
                        }}
                        >
                        Create a free account
                    </Button>
                    <Button
                        className="underline"
                        variant="link"
                        onClick={() => {
                            navigate("/login")
                            setIsUserStatsModalOpen(false)
                        }}
                    >
                        Already Registered? Log In
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}