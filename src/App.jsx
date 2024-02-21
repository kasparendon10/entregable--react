
import {Route, Routes } from 'react-router-dom';
import './App.css';
import PokeIdPage from './pages/PokeIdPage';
import PokedexPage from './pages/PokedexPage';
import HomePage from './pages/HomePage';
import ProtectedRoutes from './pages/ProtectedRoutes';


function App() {
  return (
      <Routes>
        <Route path='/' element={<HomePage />} /> 
        <Route element= {<ProtectedRoutes/>}>
          <Route path='/pokedex' element={<PokedexPage/>} />
          <Route path='/pokedex/:id' element={<PokeIdPage/>} />
        </Route>
      </Routes>
  )
}

export default App;