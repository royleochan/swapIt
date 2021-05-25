export const UPDATESORTSTATE = "UPDATESORTSTATE";

export const updateSortState = (newSortState) => {
  return (dispatch) => {
    dispatch({
      type: UPDATESORTSTATE,
      newSortState,
    });
  };
};
