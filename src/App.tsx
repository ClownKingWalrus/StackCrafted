import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'

function App() {
 return (
  <BrowserRouter>
    <Routes> {/* Handels multiple routes */}
      <Route path="/" element={<Home />}></Route> {/* Main front page */}
      <Route path="*" element={<NotFound />}></Route> {/* anything extra IE stackcrafted.net/somewords */}
    </Routes>
  </BrowserRouter>
 )
}

export default App
