import React, { useRef } from 'react';
import { setTrainerName } from '../store/slices/trainerName.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './styles/homePages.css';


const HomePage = () => {

  const dispatch = useDispatch();
  const trainerName = useSelector((store)=>store.trainerName);

 const navigate = useNavigate();
  const textInput = useRef(null);

  const handleSubmit = (event)=> {
    event.preventDefault();
    dispatch(setTrainerName(textInput.current.value.trim()));
    navigate('./pokedex');
  }
  
  
  return (
    <div className="container">
        <h1 className="title">¡Hola entrenador!</h1>
        <h2 className="subtitle">Para comenzar dame tu nombre</h2>
        <form onSubmit ={handleSubmit}>
          <input type="text" ref={textInput} />
          <button>comenzar</button>
        </form>
    </div>
  )
}

export default HomePage;