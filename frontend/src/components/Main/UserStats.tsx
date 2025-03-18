import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useAuth0 } from "@auth0/auth0-react"
import { useUserContext } from "@/contexts/UserContext"

export default function UserStats() {
    const { isAuth, name, isUserStatsModalOpen, setIsUserStatsModalOpen } = useUserContext()
    const { loginWithRedirect, logout } = useAuth0()

    async function handleLogin() {
        await loginWithRedirect({ // performs a redirect to the Auth0 /authorize endpoint
            appState: {
                returnTo: "/", 
                /*
                    When a user logs in with Auth0 and returns to the React application, take them from the default callback URL 
                    path, /callback, to the HomePage  
                */
            },
        })
    }

    function handleLogOut() {
        logout({
            logoutParams: {
                returnTo: window.location.origin
                /*
                    logoutParams.returnTo specifies the URL where Auth0 should redirect your users after they log out
                */
            }
        })
    }

    const unAuthenticatedContent = !isAuth && (
        <>
            <p className="text-xl">
                Want to start tracking
                <br />
                your stats and streaks?
            </p>
            <Button
                className="w-3/4 text-base bg-black text-white rounded-3xl"
                size="lg"
                onClick={() => {
                    handleLogin()
                    setIsUserStatsModalOpen(false)
                }}
            >
                Sign up
            </Button>
        </>
    )

    const authenticatedContent = isAuth && (
        <>
            <Button
                className="w-3/4 text-base bg-black text-white rounded-3xl"
                size="lg"
                onClick={() => {
                    handleLogOut()
                    setIsUserStatsModalOpen(false)
                }}
            >
                Log out
            </Button>
        </>
    )

    return (
        <Dialog open={isUserStatsModalOpen} onOpenChange={() => setIsUserStatsModalOpen(false)}>
            <DialogContent className="sm:max-w-md" hideClose={false}>
                <DialogTitle>{isAuth ? `Hello ${name}` : ""}</DialogTitle>
                <DialogDescription></DialogDescription>
                <div className="flex flex-col items-center space-y-6 text-center">
                    <img
                        src="/zordle-icon-thick-border.png"
                        alt="Wordle Logo"
                        className="h-16 w-16"
                    />
                    <h2 className="text-2xl font-bold">Wordle</h2>
                    {isAuth ? authenticatedContent : unAuthenticatedContent}
                </div>
            </DialogContent>
        </Dialog>
    )
}