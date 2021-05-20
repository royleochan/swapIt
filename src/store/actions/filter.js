export const UPDATEFILTERSTATE = "UPDATEFILTERSTATE";

export const updateFilterState = (newFilterState) => {
  return (dispatch) => {
    dispatch({
      type: UPDATEFILTERSTATE,
      newFilterState,
    });
  };
};
