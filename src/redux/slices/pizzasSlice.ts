import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
    'pizzas/fetchPizzasItems',
    async (url: string) => {
        const { data } = await axios.get(url);
        return data;
    },
);

interface IPizza {
    id: string;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
    category: number;
    rating: number;
}

interface IPizzasState {
    items: IPizza[];
    isLoading: boolean;
}

const initialState: IPizzasState = {
    items: [],
    isLoading: false,
};

const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    },
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

export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;