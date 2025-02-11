import { WordleContextProvider } from "./contexts/WordleContext"
import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./components/HomePage";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Battle from "./components/Battle/Battle";

export default function App() {
  return (
    <>
      <WordleContextProvider>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<HomePage />}/>
              <Route path="/my-login" element={<Login />}/>
              <Route path="/my-signup" element={<Signup />}/>
              <Route path="/battle" element={<Battle />}/>
          </Routes>
        </BrowserRouter>
      </WordleContextProvider>
    </>
  )
}