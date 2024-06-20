import { createSlice } from '@reduxjs/toolkit'
import { sortTypes } from '../../components/Sort';
import qs from 'qs';

function getInitialState() {
  if (window.location.search) {
    const params = qs.parse(window.location.search.slice(1));

    for (let field in params) {
      if (typeof params[field] !== 'string') continue;
      params[field] = Number(params[field]);
    }

    return params;
  }

  return {
    category: 0,
    page: 1,
    sortType: sortTypes[0],
  };
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: getInitialState(),
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
  },
});

export const { setCategory, setSortType, setPage } = filterSlice.actions;
export default filterSlice.reducer;