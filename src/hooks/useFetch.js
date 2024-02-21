import axios from "axios";
import { useState } from "react";


const useFetch = () => {
    const [apiData, setApiData] = useState();

    const getApi = (url) => {
        axios.get(url)
        .then(res =>setApiData(res.data))
        .catch(err => console.log(err));
    }
    const getApiType = (url) => {
        axios.get(url)
          .then(res =>{
            setApiData({
                results:res.data.pokemon.map(poke=>poke.pokemon)
            });
          })
          .catch(err => console.log(err));
        }
        return [apiData, getApi, getApiType];
}

export default useFetch;