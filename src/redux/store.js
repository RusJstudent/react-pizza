import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice';
import sortReducer from './slices/sortSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    sort: sortReducer,
  },
})