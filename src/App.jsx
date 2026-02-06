import { BrowserRouter, Routes, Route } from 'react-router-dom'              //REACT ROUTER DOM - gestisce webapp multipagina con React
import HomePage from './pages/Homepage'
import ChiSiamo from './pages/ChiSiamo'
import Prodotti from './pages/Prodotti'
import SingleProduct from './pages/SingleProduct'
import DefaultLayout from './layout/DefaultLayout'
import ErrorPage from './pages/ErrorPage'
import {BudgetProvider} from './contexts/BudgetContext'


function App() {
  return (
    <BudgetProvider>
      <BrowserRouter>                                     
        <Routes>                                                                {/* Tutte le pagine dell'applicazione */}
          <Route Component={DefaultLayout}>                                     {/* Route padre che carica il Layout per tutte le pagine */}
            <Route path="/" Component={HomePage} />                             {/* "/" carica la pagina principale */} 
            <Route path="/chi-siamo" Component={ChiSiamo} />                    {/* "/..." tutte le altre pagine */}
            <Route path="/prodotti" Component={Prodotti} />                   
            <Route path="/prodotti/:id" Component={SingleProduct} />            {/* "/:(var)" parametro dinamico es: product/1, product/2 ... */}
            <Route path="/prodotti/:category/:id" Component={SingleProduct} />  {/* ":(var)/:(var2)" posso caricare piu parametri dinamici es: product/men/3, product/woman/4... */}
            <Route path="*" Component={ErrorPage} />
          </Route>
        </Routes>
      </BrowserRouter>
    </BudgetProvider>
  )
}

export default App
