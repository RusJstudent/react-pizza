import { createSlice } from '@reduxjs/toolkit'
import { sortTypes } from '../../components/Sort';
import qs from 'qs';

export type SortType = {
  name: string;
  field: 'rating' | 'price' | 'title';
  order: 'asc' | 'desc';
}

interface IFilterState {
  category: number;
  page: number;
  sortType: SortType;
  searchValue: string;
}

function getInitialState() {
  let initialState: IFilterState = {
    category: 0,
    page: 1,
    sortType: sortTypes[0],
    searchValue: '',
  };

  if (window.location.search) {
    const params = qs.parse(window.location.search.slice(1));

    for (let field in params) {
      if (typeof params[field] !== 'string') continue;
      params[field] = Number(params[field]) as any;
    }

    initialState = { ...initialState, ...params };
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