import { UPDATEFILTERSTATE } from "store/actions/filter";

const initialState = {
  minPrice: null, // number
  maxPrice: null, // number
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATEFILTERSTATE:
      return {
        ...action.newFilterState,
      };
    default:
      return state;
  }
};
