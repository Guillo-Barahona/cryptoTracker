
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import NavBar from './Components/NavBar'
import CoinList from './Components/CoinList'
import CoinNews from './Components/CoinNews'
import Error404 from './Components/Error404'


function App() {

  return (
    <div>
      <BrowserRouter>
        <NavBar></NavBar>

        <Routes>
            <Route path={""} element={<CoinList/>}></Route>
            <Route path={"/blog"} element={<CoinNews/>}></Route>
            <Route path={"*"} element={<Error404/>}/> {/* para redireccionar por si se pone una direccion inválida */}
        </Routes>

      </BrowserRouter>
      
    </div>
  )
}

export default App
