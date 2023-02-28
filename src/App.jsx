import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'

function App() {

  return <>
  
  <Routes>
    <Route path='/home' element={<Home/>}/>
    <Route path='/' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
  </Routes>

  </>
}

export default App
