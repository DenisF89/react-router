import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Homepage'
import ChiSiamo from './pages/ChiSiamo'
import Prodotti from './pages/Prodotti'
import Navbar from './components/Navbar'
import DefaultLayout from './layout/DefaultLayout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route Component={DefaultLayout}>
          <Route path="/" Component={HomePage} />
          <Route path="/chi-siamo" Component={ChiSiamo} />
          <Route path="/prodotti" Component={Prodotti} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
