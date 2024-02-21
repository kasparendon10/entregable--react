import React, { useEffect, useRef } from 'react';
import useFetch from '../../hooks/useFetch';
import { useDispatch } from 'react-redux';
import { setPokemonName } from '../../store/slices/pokemonName.slice';

const SelectType = ({setSelectValue}) => {

    const [types,  getTypes] = useFetch();
    const dispatch = useDispatch();

useEffect(() => {
    const url = 'https://pokeapi.co/api/v2/type';
    getTypes(url);
}, []);
        
    const textSelect = useRef();

    const handleChange = ()=> {
        setSelectValue(textSelect.current.value);
        dispatch (setPokemonName(' '));
    }
   
  return (
    <select onChange={handleChange } ref ={textSelect}>
        <option value="allPokemons">all Pokemons</option>
        {
            types?.results.map(type =>(
                <option key={type.url} value={type.url}>{type.name}</option>
            ))
        }
    </select>
  )
}

export default SelectType;