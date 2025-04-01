import React, { createContext, useState, ReactNode, useContext, useEffect } from "react"
import { GridColourState, KeyboardColourState, Letter } from "@/types/WordleTypes"
import { DEFAULT_GRID_COLOUR_STATE, DEFAULT_KEYBOARD_COLOUR_STATE, DEFAULT_WORDS } from "./DefaultStates";
import { Socket, io } from "socket.io-client";

export type BattleStateType = {
    // Modals
    roomId: string;
    setRoomId: React.Dispatch<React.SetStateAction<string>>;
    isAreYouReadyModalOpen: boolean;
    setIsAreYouReadyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isExitGameModalOpen: boolean;
    setIsExitGameModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isGameStartingModalOpen: boolean;
    setIsGameStartingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isWaitingForOtherPlayerModalOpen: boolean;
    setIsWaitingForOtherPlayerModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

    // Generic fields
    player1Email: string;
    setPlayer1Email: React.Dispatch<React.SetStateAction<string>>;
    player2Email: string;
    setPlayer2Email: React.Dispatch<React.SetStateAction<string>>;
    isPlayer1Ready: boolean;
    setIsPlayer1Ready: React.Dispatch<React.SetStateAction<boolean>>;
    isPlayer2Ready: boolean;
    setIsPlayer2Ready: React.Dispatch<React.SetStateAction<boolean>>;
    atReadyPage: boolean;
    setAtReadyPage: React.Dispatch<React.SetStateAction<boolean>>;

    selectedWord: string;
    setSelectedWord: React.Dispatch<React.SetStateAction<string>>;
    timer: number;
    setTimer: React.Dispatch<React.SetStateAction<number>>;

    // Player specific fields
    your_words: string[];
    setyour_words: React.Dispatch<React.SetStateAction<string[]>>;
    your_wordIdx: number;
    setyour_wordIdx: React.Dispatch<React.SetStateAction<number>>;
    your_gridColourState: GridColourState[][];
    setyour_gridColourState: React.Dispatch<React.SetStateAction<GridColourState[][]>>;
    your_keyboardColourState: Record<Letter, KeyboardColourState>;
    setyour_keyboardColourState: React.Dispatch<React.SetStateAction<Record<Letter, KeyboardColourState>>>;
    your_isGameOver: boolean;
    setyour_isGameOver: React.Dispatch<React.SetStateAction<boolean>>;
    your_popupMessage: string | null;
    setyour_popupMessage: React.Dispatch<React.SetStateAction<string | null>>;
    your_triggerWordShakeAnimation: boolean;
    setyour_triggerWordShakeAnimation: React.Dispatch<React.SetStateAction<boolean>>;
    your_triggerLettersFlipAnimation: boolean;
    setyour_triggerLettersFlipAnimation: React.Dispatch<React.SetStateAction<boolean>>;
    your_isKeyboardDisabled: boolean;
    setyour_isKeyboardDisabled: React.Dispatch<React.SetStateAction<boolean>>;

    opponent_words: string[];
    setopponent_words: React.Dispatch<React.SetStateAction<string[]>>;
    opponent_wordIdx: number;
    setopponent_wordIdx: React.Dispatch<React.SetStateAction<number>>;
    opponent_gridColourState: GridColourState[][];
    setopponent_gridColourState: React.Dispatch<React.SetStateAction<GridColourState[][]>>;
    // opponent_keyboardColourState: Record<Letter, KeyboardColourState>;
    // setopponent_keyboardColourState: React.Dispatch<React.SetStateAction<Record<Letter, KeyboardColourState>>>;
    opponent_triggerLettersFlipAnimation: boolean;
    setopponent_triggerLettersFlipAnimation: React.Dispatch<React.SetStateAction<boolean>>;

    // WebSocket
    socket: Socket | null
    setSocket: React.Dispatch<React.SetStateAction<Socket | null>>,
};

const BattleContext = createContext<BattleStateType | null>(null)

const BattleContextProvider = ({ children }: { children: ReactNode }) => {
    const [roomId, setRoomId] = useState<string>("");
    const [isAreYouReadyModalOpen, setIsAreYouReadyModalOpen] = useState<boolean>(false);
    const [isExitGameModalOpen, setIsExitGameModalOpen] = useState<boolean>(false);
    const [isGameStartingModalOpen, setIsGameStartingModalOpen] = useState<boolean>(false);
    const [isWaitingForOtherPlayerModalOpen, setIsWaitingForOtherPlayerModalOpen] = useState<boolean>(false);

    const [player1Email, setPlayer1Email] = useState<string>("");
    const [player2Email, setPlayer2Email] = useState<string>("");
    const [isPlayer1Ready, setIsPlayer1Ready] = useState<boolean>(false);
    const [isPlayer2Ready, setIsPlayer2Ready] = useState<boolean>(false);
    const [atReadyPage, setAtReadyPage] = useState<boolean>(false);

    const [selectedWord, setSelectedWord] = useState<string>("");
    const [timer, setTimer] = useState<number>(0);

    const [your_words, setyour_words] = useState<string[]>(DEFAULT_WORDS);
    const [your_wordIdx, setyour_wordIdx] = useState<number>(0);
    const [your_gridColourState, setyour_gridColourState] = useState<GridColourState[][]>(DEFAULT_GRID_COLOUR_STATE);
    const [your_keyboardColourState, setyour_keyboardColourState] = useState<Record<Letter, KeyboardColourState>>(DEFAULT_KEYBOARD_COLOUR_STATE);
    const [your_isGameOver, setyour_isGameOver] = useState<boolean>(false);
    const [your_popupMessage, setyour_popupMessage] = useState<string | null>(null);
    const [your_triggerWordShakeAnimation, setyour_triggerWordShakeAnimation] = useState<boolean>(false);
    const [your_triggerLettersFlipAnimation, setyour_triggerLettersFlipAnimation] = useState<boolean>(false);
    const [your_isKeyboardDisabled, setyour_isKeyboardDisabled] = useState<boolean>(false);

    const [opponent_words, setopponent_words] = useState<string[]>(DEFAULT_WORDS);
    const [opponent_wordIdx, setopponent_wordIdx] = useState<number>(0);
    const [opponent_gridColourState, setopponent_gridColourState] = useState<GridColourState[][]>(DEFAULT_GRID_COLOUR_STATE);
    // const [opponent_keyboardColourState, setopponent_keyboardColourState] = useState<Record<Letter, KeyboardColourState>>(DEFAULT_KEYBOARD_COLOUR_STATE);
    const [opponent_triggerLettersFlipAnimation, setopponent_triggerLettersFlipAnimation] = useState<boolean>(false);

    const [socket, setSocket] = useState<Socket | null>(null);

    // connects to socket upon creating BattleContext
    useEffect(() => {
        if (socket !== null) return;
        const s = io("http://localhost:7001") // 7001: Websocket port
        setSocket(s)
        return () => {
            s.disconnect()
        }
    }, [])

    const battleState: BattleStateType = {
        roomId, setRoomId,
        isAreYouReadyModalOpen, setIsAreYouReadyModalOpen,
        isExitGameModalOpen, setIsExitGameModalOpen,
        isGameStartingModalOpen, setIsGameStartingModalOpen,
        isWaitingForOtherPlayerModalOpen, setIsWaitingForOtherPlayerModalOpen,

        player1Email, setPlayer1Email,
        player2Email, setPlayer2Email,
        isPlayer1Ready, setIsPlayer1Ready,
        isPlayer2Ready, setIsPlayer2Ready,
        atReadyPage, setAtReadyPage,

        selectedWord, setSelectedWord,
        timer, setTimer,

        your_words, setyour_words,
        your_wordIdx, setyour_wordIdx,
        your_gridColourState, setyour_gridColourState,
        your_keyboardColourState, setyour_keyboardColourState,
        your_isGameOver, setyour_isGameOver,
        your_popupMessage, setyour_popupMessage,
        your_triggerWordShakeAnimation, setyour_triggerWordShakeAnimation,
        your_triggerLettersFlipAnimation, setyour_triggerLettersFlipAnimation,
        your_isKeyboardDisabled, setyour_isKeyboardDisabled,
        opponent_words, setopponent_words,
        opponent_wordIdx, setopponent_wordIdx,
        opponent_gridColourState, setopponent_gridColourState,
        // opponent_keyboardColourState, setopponent_keyboardColourState,
        opponent_triggerLettersFlipAnimation, setopponent_triggerLettersFlipAnimation,

        socket, setSocket
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
