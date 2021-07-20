import {
  FETCH_CATEGORY_PRODUCTS,
  APPLY_FILTER_AND_SORT_PRODUCTS,
  UPDATE_SORT_STATE,
  UPDATE_FILTER_STATE,
  FETCH_SEARCH_PRODUCTS,
} from "store/actions/products";

const sortInitialAllFalse = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
};

const initialState = {
  filterState: {
    minPrice: null, // number
    maxPrice: null, // number
  },
  sortState: {
    0: true,
    1: false,
    2: false,
    3: false,
    4: false,
  },
  allProducts: [],
  filteredSortedProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_PRODUCTS:
    case FETCH_SEARCH_PRODUCTS:
      return {
        ...state,
        allProducts: action.products,
        filteredSortedProducts: action.products,
      };
    case APPLY_FILTER_AND_SORT_PRODUCTS:
      return {
        ...state,
        filteredSortedProducts: action.products,
      };
    case UPDATE_SORT_STATE:
      return {
        ...state,
        sortState: {
          ...sortInitialAllFalse,
          ...action.newSortState,
        },
      };
    case UPDATE_FILTER_STATE:
      return {
        ...state,
        filterState: {
          ...action.newFilterState,
        },
      };
    default:
      return state;
  }
};
