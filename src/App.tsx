import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Rutas from './Rutas/Rutas'
import { Cabecera } from './components/Cabecera'


function App() {
  return (
    <BrowserRouter>
      <Cabecera />
      <Rutas />
    </BrowserRouter>
  )
}

export default App
