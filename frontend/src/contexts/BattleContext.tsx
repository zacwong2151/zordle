import React, { createContext, useState, ReactNode, useContext } from "react"

type BattleStateType = {
    roomId: String,
    setRoomId: React.Dispatch<React.SetStateAction<String>>,
    isAreYouReadyModalOpen: boolean,
    setIsAreYouReadyModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isExitGameModalOpen: boolean,
    setIsExitGameModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isGameStartingModalOpen: boolean,
    setIsGameStartingModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isWaitingForOtherPlayerModalOpen: boolean,
    setIsWaitingForOtherPlayerModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const BattleContext = createContext<BattleStateType | null>(null)

const BattleContextProvider = ({ children } : { children: ReactNode }) => {
    const [roomId, setRoomId] = useState<String>("")
    const [isAreYouReadyModalOpen, setIsAreYouReadyModalOpen] = useState<boolean>(false)
    const [isExitGameModalOpen, setIsExitGameModalOpen] = useState<boolean>(false)
    const [isGameStartingModalOpen, setIsGameStartingModalOpen] = useState<boolean>(false)
    const [isWaitingForOtherPlayerModalOpen, setIsWaitingForOtherPlayerModalOpen] = useState<boolean>(false)
    
    const battleState: BattleStateType = {
        roomId, setRoomId,
        isAreYouReadyModalOpen, setIsAreYouReadyModalOpen,
        isExitGameModalOpen, setIsExitGameModalOpen,
        isGameStartingModalOpen, setIsGameStartingModalOpen,
        isWaitingForOtherPlayerModalOpen, setIsWaitingForOtherPlayerModalOpen
    }
    
    return (
        <BattleContext.Provider value={battleState}>
            {children}
        </BattleContext.Provider>
    )
}

function useBattleContext() {
    const context = useContext(BattleContext)
    if (!context) {
        throw new Error("useBattleContext must be used within a BattleContextProvider")
    }
    return context
}

export { BattleContextProvider, useBattleContext }
