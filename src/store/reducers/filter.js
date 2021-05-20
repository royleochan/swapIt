import { UPDATEFILTERSTATE } from "store/actions/filter";

const initialState = {
  minPrice: null,
  maxPrice: null,
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
