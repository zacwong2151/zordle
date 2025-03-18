import Grid from "../Grid/Grid";
import Keyboard from "../Keyboard/Keyboard";
import HomepageNavbar from "./HomepageNavbar";

export default function HomePage() {
    return (
        <>
            <HomepageNavbar />
            <div className="h-max w-screen flex flex-col items-center justify-center gap-4 my-8">
                <Grid />
                <Keyboard />
            </div>
        </>
    )
}