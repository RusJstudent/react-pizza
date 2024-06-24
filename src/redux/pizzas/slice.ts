import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IPizzasState, IPizza } from "./types";

export const fetchPizzas = createAsyncThunk<IPizza[], string>(
    'pizzas/fetchPizzasItems',
    async url => {
        const { data } = await axios.get<IPizza[]>(url);
        return data;
    },
);

const initialState: IPizzasState = {
    items: [],
    isLoading: false,
};

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.items = [];
            state.isLoading = false;
        });
    }
});

export default pizzasSlice.reducer;