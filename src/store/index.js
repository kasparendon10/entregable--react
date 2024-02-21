import { configureStore } from "@reduxjs/toolkit";
import trainerName from "./slices/trainerName.slice.js";
import pokemonName  from "./slices/pokemonName.slice.js";

const store = configureStore({
    reducer: {
        trainerName,
        pokemonName,
    }
});
export default store;