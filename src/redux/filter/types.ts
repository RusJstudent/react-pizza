export type SortType = {
    name: string;
    field: 'rating' | 'price' | 'title';
    order: 'asc' | 'desc';
}

export interface IFilterState {
    category: string;
    page: string;
    sortType: SortType;
    searchValue: string;
}