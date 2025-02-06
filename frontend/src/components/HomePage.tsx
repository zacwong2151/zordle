import Grid from "./Grid/Grid";
import Keyboard from "./Keyboard/Keyboard";
import NavBar from "./NavBar";
import UserStats from "./UserStats";

export default function HomePage() {
    return (
        <>
            <NavBar />
            <div className="h-max w-screen flex flex-col items-center justify-center gap-4 my-12">
                <Grid />
                <Keyboard />
                <UserStats />
            </div>
        </>
    )
}