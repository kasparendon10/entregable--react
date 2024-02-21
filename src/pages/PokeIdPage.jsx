import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import './styles/pokeIdPage.css';

const PokeIdPage = () => {

  const [pokeData, getPokeData ]= useFetch();
  const [pokemon, setPokemon] = useState(null);
  const param = useParams();

  useEffect(()=> {
    const url = ` https://pokeapi.co/api/v2/pokemon/${param.id}`;
    getPokeData(url);
  },[getPokeData, param.id]);

  useEffect(() => {
    // Set pokemon data once the API call is successful
    if (pokeData) {
      setPokemon(pokeData);
    }
  }, [pokeData]);

  return (
    <article className="PokeIdPage">
      <img src={pokemon?.sprites.other['official-artwork'].front_default} alt="pokemon photo" />
      <h3>{pokemon?.name}</h3>

      {/* Display types */}
      <ul className='poke__types'>
        {pokemon?.types?.map((type) => (
          <li key={type.type.url} className={`slot${type.slot}`}>
            {type.type.name}
          </li>
        ))}
      </ul>

      <p>Type</p>
      <hr />

      {/* Display stats */}
      <ul className='poke__stats'>
        {pokemon?.stats.map((stat) => (
          !stat.stat.name.includes('special') && (
            <li key={stat.stat.url}>
              {stat.stat.name}
              <span>{stat.base_stat}</span>
            </li>
          )
        ))}
      </ul>
    </article>
  );
};

export default PokeIdPage;