import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    url: {},
    genres: {}
}

export const homeSlice = createSlice({
    name: "HomeSlice",
    initialState,
    reducers: {
        getApiConfiguration: (state, action) => {
            state.url = action.payload;
        },
        getGenres: (state, action) => {
            state.genres = action.payload;
        }
    }
})

export const { getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer;


// Create store folder and store.js
// import configureStore then at last sliceReducer

// import store.js, provider in main.jsx
// Wrap frag of main with provider

// Create slices, import createSlice and configure state and actions
// export slice, actions, reducer
