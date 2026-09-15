import BarreLaterale from "./components/BarreLaterale"
import { Outlet } from "react-router-dom"

function App() {

  return (
    <>
      <div className='app-layout'>
        <BarreLaterale/>

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default App
