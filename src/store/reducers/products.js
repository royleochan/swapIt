import { UPDATEPRODUCTS } from "store/actions/products";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATEPRODUCTS:
      return action.products;
    default:
      return state;
  }
};
