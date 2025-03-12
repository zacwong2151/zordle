import Grid from "../Grid/Grid";
import Keyboard from "../Keyboard/Keyboard";
import NavBar from "./NavBar";

export default function HomePage() {
    return (
        <>
            <NavBar />
            <div className="h-max w-screen flex flex-col items-center justify-center gap-4 my-8">
                <Grid />
                <Keyboard />
            </div>
        </>
    )
}