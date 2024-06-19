import { createSlice } from '@reduxjs/toolkit'
import { sortTypes } from '../../components/Sort';

const initialState = {
    category: 0,
    sortType: sortTypes[0],
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, action) {
        state.category = action.payload;
    },
    setSortType(state, action) {
        state.sortType = action.payload;
    },
  },
})

export const { setCategory, setSortType } = filterSlice.actions
export default filterSlice.reducer


