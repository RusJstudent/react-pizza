import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { sortTypes } from '../../components/Sort';
import qs from 'qs';

import { IFilterState } from './types';

function getInitialState() {
  let initialState: IFilterState = {
    category: '0',
    page: '1',
    sortType: sortTypes[0],
    searchValue: '',
  };

  if (window.location.search) {
    const params = qs.parse(window.location.search.slice(1));

    initialState = { ...initialState, ...params };
  }

  return initialState;
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: getInitialState(),
  reducers: {
    setCategory(state, action: PayloadAction<IFilterState['category']>) {
      state.category = action.payload;
      state.page = '1';
    },
    setSortType(state, action: PayloadAction<IFilterState['sortType']>) {
      state.sortType = action.payload;
    },
    setPage(state, action: PayloadAction<IFilterState['page']>) {
      state.page = action.payload;
    },
    setSearchValue(state, action: PayloadAction<IFilterState['searchValue']>) {
      state.searchValue = action.payload;
      state.page = '1';
    }
  },
});

export const { setCategory, setSortType, setPage, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;