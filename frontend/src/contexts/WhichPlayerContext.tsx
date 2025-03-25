import { createContext, useContext } from "react"
import { WhichPlayer } from "@/types/BattleTypes";

const WhichPlayerContext = createContext<WhichPlayer>(WhichPlayer.SOLO);

const WhichPlayerContextProvider = ({ children, whichPlayer }: { children: React.ReactNode, whichPlayer: WhichPlayer }) => {
    return (
        <WhichPlayerContext.Provider value={whichPlayer}>
            {children}
        </WhichPlayerContext.Provider>
    )
}

function useWhichPlayerContext() : WhichPlayer {
    return useContext(WhichPlayerContext)
}

export { WhichPlayerContextProvider, useWhichPlayerContext }