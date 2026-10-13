import MovieDashboard from "./pages/MovieDashboard.jsx"
import './App.css'
import { Button } from "@/components/ui/button.jsx"

function App() {

  return (
    <div>
      <h1 className="text-6xl">Hello World</h1>
      <MovieDashboard/>
      <Button>
          Click Me
      </Button>
    </div>
  )
}

export default App
