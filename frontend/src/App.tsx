import Grid from "./components/Grid/Grid"
import Keyboard from "./components/Keyboard/Keyboard"
import NavBar from "./components/NavBar"
import { WordleContextProvider } from "./contexts/WordleContext"

export default function App() {
  return (
    <>
      <WordleContextProvider>
        <NavBar />
        <div className="h-max w-screen flex flex-col items-center justify-center gap-4 my-12">
            <Grid />
            <Keyboard />
        </div>
      </WordleContextProvider>
    
    </>
  )
}