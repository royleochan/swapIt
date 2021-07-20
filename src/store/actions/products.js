export const FETCH_CATEGORY_PRODUCTS = "FETCH_CATEGORY_PRODUCTS";
export const FETCH_SEARCH_PRODUCTS = "FETCH_SEARCH_PRODUCTS";
export const APPLY_FILTER_AND_SORT_PRODUCTS = "APPLY_FILTER_AND_SORT_PRODUCTS";
export const UPDATE_SORT_STATE = "UPDATE_SORT_STATE";
export const UPDATE_FILTER_STATE = "UPDATE_FILTER_STATE";

import throwApiError from "utils/apiError";
import request from "utils/request";

export const fetchCategoryProducts = (category) => {
  return async (dispatch, getState) => {
    const loggedInUserId = getState().auth.user.id;
    try {
      let response;
      if (category === "Following") {
        response = await request.get(`/api/products/all/${loggedInUserId}`);
      } else {
        response = await request.get(`/api/products/category/${category}`);
      }
      dispatch({
        type: FETCH_CATEGORY_PRODUCTS,
        products: response.data.products,
      });
    } catch (err) {
      throwApiError(err);
    }
  };
};

export const searchProductsHandler = (searchQuery) => {
  return async (dispatch) => {
    try {
      const response = await request.get(`/api/products/search/${searchQuery}`);
      dispatch({
        type: FETCH_SEARCH_PRODUCTS,
        products: response.data.products,
      });
    } catch (err) {
      throwApiError(err);
    }
  };
};

export const applyFilterAndSortProducts = (products) => {
  return (dispatch) => {
    dispatch({
      type: APPLY_FILTER_AND_SORT_PRODUCTS,
      products: products,
    });
  };
};

export const updateSortState = (newSortState) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_SORT_STATE,
      newSortState,
    });
  };
};

export const updateFilterState = (newFilterState) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_FILTER_STATE,
      newFilterState,
    });
  };
};
