import { createSlice } from '@reduxjs/toolkit'
import { sortTypes } from '../../components/Sort';
import qs from 'qs';

function getInitialState() {
  let initialState = {
    category: 0,
    page: 1,
    sortType: sortTypes[0],
    searchValue: '',
  };

  if (window.location.search) {
    const params = qs.parse(window.location.search.slice(1));

    for (let field in params) {
      if (typeof params[field] !== 'string') continue;
      params[field] = Number(params[field]);
    }

    initialState = {...initialState, ...params};
  }

  return initialState;
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
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    }
  },
});

export const { setCategory, setSortType, setPage, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;