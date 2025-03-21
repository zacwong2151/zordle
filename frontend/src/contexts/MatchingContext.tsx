import React, { createContext, useState, ReactNode, useContext } from "react"

type MatchingStateType = {
    isCreateRoomModalOpen: boolean,
    setIsCreateRoomModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isJoinRoomModalOpen: boolean,
    setIsJoinRoomModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isInvalidRoomModalOpen: boolean,
    setIsInvalidRoomModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isCurrentlyInGameModalOpen: boolean,
    setIsCurrentlyInGameModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const MatchingContext = createContext<MatchingStateType | null>(null)

const MatchingContextProvider = ({ children } : { children: ReactNode }) => {
    const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState<boolean>(false)
    const [isJoinRoomModalOpen, setIsJoinRoomModalOpen] = useState<boolean>(false)
    const [isInvalidRoomModalOpen, setIsInvalidRoomModalOpen] = useState<boolean>(false)
    const [isCurrentlyInGameModalOpen, setIsCurrentlyInGameModalOpen] = useState<boolean>(false)
    
    const matchingState: MatchingStateType = {
        isCurrentlyInGameModalOpen, setIsCurrentlyInGameModalOpen,
        isCreateRoomModalOpen, setIsCreateRoomModalOpen,
        isJoinRoomModalOpen, setIsJoinRoomModalOpen,
        isInvalidRoomModalOpen, setIsInvalidRoomModalOpen
    }
    
    return (
        <MatchingContext.Provider value={matchingState}>
            {children}
        </MatchingContext.Provider>
    )
}

function useMatchingContext() {
    const context = useContext(MatchingContext)
    if (!context) {
        throw new Error("useWordleContext must be used within a WordleContextProvider")
    }
    return context
}

export { MatchingContextProvider, useMatchingContext }
