import { configureStore } from '@reduxjs/toolkit'

import filterReducer from './filter/slice';
import cartReducer from './cart/slice';
import pizzasReducer from './pizzas/slice';

import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizzas: pizzasReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>()