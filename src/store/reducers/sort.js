import { UPDATESORTSTATE } from "store/actions/sort";

const initialState = {
  0: true,
  1: false,
  2: false,
  3: false,
  4: false,
};

const updatedInitialState = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATESORTSTATE:
      return {
        ...updatedInitialState,
        ...action.newSortState,
      };
    default:
      return state;
  }
};
