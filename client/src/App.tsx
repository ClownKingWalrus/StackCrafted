import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import IEEE_Club from './Pages/IEEE_Club'
import IEEE_Club_CreateAccount from './Pages/IEEE_Club_CreateAccount'
import IEEE_Club_Login from './Pages/IEEE_Club_Login'
import IEEE_AddEvent from './Components/IEEEClub/IEEE_AddEvent'

function App() {
 return (
  <BrowserRouter>
    <Routes> {/* Handels multiple routes */}

      {/* HomePage */}
      <Route path="/" element={<Home />}></Route> {/* Main front page */}

      {/* IEEE Club Routes */}
      <Route path="/IEEE_Club" element={<IEEE_Club />}></Route> {/* Main front page */}
      <Route path="/IEEE_Club/CreateAccount" element={<IEEE_Club_CreateAccount />}></Route> {/* Main front page */}
      <Route path="/IEEE_Club/Login" element={<IEEE_Club_Login />}></Route> {/* Main front page */}
      <Route path="/IEEE_Club/AddEvent" element={<IEEE_AddEvent />}></Route> {/* Main front page */}

      {/* Invalid Routes */}
      <Route path="*" element={<NotFound />}></Route> {/* anything extra IE stackcrafted.net/somewords */}
    </Routes>
  </BrowserRouter>
 )
}

export default App
