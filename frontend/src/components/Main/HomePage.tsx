import Grid from "../Grid/Grid";
import Keyboard from "../Keyboard/Keyboard";
import HomepageNavbar from "./HomepageNavbar";
import { BattleContextProvider } from "@/contexts/BattleContext";
import { WhichPlayer } from "@/types/BattleTypes";
import { WhichPlayerContextProvider } from "@/contexts/WhichPlayerContext";

export default function HomePage() {
    return (
        <>
            <HomepageNavbar />
            <div className="h-max w-screen flex flex-col items-center justify-center gap-4 my-6 md:my-10">
                <BattleContextProvider>
                    <WhichPlayerContextProvider whichPlayer={WhichPlayer.SOLO} >
                        <Grid />    
                        <Keyboard />
                    </WhichPlayerContextProvider>
                </BattleContextProvider>
            </div>
        </>
    )
}