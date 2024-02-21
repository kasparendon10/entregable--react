import React,{useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPokemonName } from '../store/slices/pokemonName.slice';
import useFetch from '../hooks/useFetch';
import PokeCard from '../components/PokedexPage/PokeCard';
import SelectType from '../components/PokedexPage/SelectType';
import './styles/pokedexPage.css'


const PokedexPage = () => {

  const [selectValue, setSelectValue]= useState('allpokemons');
  const trainerName = useSelector(store => store.trainerName);
  const pokemonName = useSelector(store => store.pokemonName);
  const dispatch = useDispatch();
  const [pokemons, getPokemons, getperType]= useFetch();
  const [currentPage, setCurrentPage] = useState(1);
  const elementsPerPage = 3;


  useEffect(() => {
    if(selectValue==='allPokemons'){
      const url = 'https://pokeapi.co/api/v2/pokemon/?limit=40' ;
    getPokemons(url);
    }else{
      getperType(selectValue)
    }
    
  }, [selectValue, currentPage]);
  
  

  const textInput = useRef();

  const handleSubmit = (event) =>{
    event.preventDefault();
    dispatch(setPokemonName(textInput.current.value.trim()));
    textInput.current.value=" ";
  }
 //console.log(pokemons);

 const cbFilter = () => {
  if(pokemonName) {
    return pokemons?.results.filter(element => element.name.includes(pokemonName));
  } else{
    return pokemons?.results;
  }
 }
 const totalPages = Math.ceil((cbFilter()?.length || 4) / elementsPerPage);

 const handlePageChange = (newPage) => {
   setCurrentPage(newPage);
 }
  return (
    <div className='pokedex'>
      <section className='poke__header'>
          <h3>
            <span>Bienvenido {trainerName},</span> encuentra tu pokemon favorito
            </h3>
          <div >
            <form onSubmit ={handleSubmit}>
              <input type="text" ref={textInput}/>
              <button>Buscar</button>
              </form>
          <SelectType 
        setSelectValue={setSelectValue} />
      </div>
    </section>
    <section className='poke__container'>
    {
      cbFilter()?.slice((currentPage - 1) * elementsPerPage, currentPage * elementsPerPage).map((poke) => (
          <PokeCard
            key={poke.url}
            url={poke.url}
          />
      ))
    }
    </section>
    <div className="poke__pagination">
      {/* Botón para disminuir*/}
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        {"<"}
      </button>
      {/* Botones de paginación */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button key={page} onClick={() => handlePageChange(page)} disabled={page === currentPage}>
          {page}
        </button>
      ))}
      {/* Botón para aumentar*/}
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        {">"}
      </button>
    </div>
  </div>
)
{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
  <button key={page} onClick={() => handlePageChange(page)} disabled={page === currentPage}>
    {page}
  </button>
))}    
 }

export default PokedexPage;