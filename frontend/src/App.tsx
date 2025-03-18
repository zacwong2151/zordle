import HomePage from "./components/Main/HomePage";
import FindBattle from "./components/Battle/FindBattle";
import BattlePage from "./components/Battle/BattlePage";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import CallBackPage from "./components/Main/CallBackPage";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingPage from "./components/Misc/LoadingPage";
import { WordleContextProvider } from "./contexts/WordleContext";
import { MatchingContextProvider } from "./contexts/MatchingContext";

export default function App() {
    const { isLoading } = useAuth0()

    if (isLoading) {
        return (
            <LoadingPage />
        )
    }

    return (
        <>
            <Routes>
                <Route path="/" element={
                    <WordleContextProvider>
                        <HomePage />
                    </WordleContextProvider>
                } />
                <Route path="/battle" element={
                    <MatchingContextProvider>
                        <ProtectedRoute component={FindBattle} />
                    </MatchingContextProvider>
                } />
                <Route path="/battle/:roomId" element={<ProtectedRoute component={BattlePage} />} />
                <Route path="/callback" element={<CallBackPage />} />
            </Routes>
        </>
    )
}