import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "../features/eventsSlice"
import categoriesReducer from "../features/categoriesSlice";
import departamentsReducer from "../features/departamentsSlice";
import citiesReducer from "../features/citiesSlice"

export const store = configureStore({
    reducer:{
        events: eventsReducer,
        categories: categoriesReducer,
        departaments: departamentsReducer,
        cities: citiesReducer,
    }
});