import { WordleContextProvider } from "./contexts/WordleContext"
import HomePage from "./components/Main/HomePage";
import Battle from "./components/Battle/Battle";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import CallBackPage from "./components/Main/CallBackPage";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingPage from "./components/Misc/LoadingPage";

export default function App() {
    const { isLoading } = useAuth0()

    if (isLoading) {
        return (
            <LoadingPage />
        )
    }
  
    return (
        <>
            <WordleContextProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/battle" element={<ProtectedRoute component={Battle} />} />
                    <Route path="/callback" element={<CallBackPage />} />
                </Routes>
            </WordleContextProvider>
        </>
    )
}