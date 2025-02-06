import { WordleContextProvider } from "./contexts/WordleContext"
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./components/HomePage";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

export default function App() {
  return (
    <>
      <WordleContextProvider>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<HomePage />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/signup" element={<Signup />}/>
          </Routes>
        </BrowserRouter>
      </WordleContextProvider>
    </>
  )
}