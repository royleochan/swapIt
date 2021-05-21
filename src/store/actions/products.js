export const UPDATEPRODUCTS = "UPDATEPRODUCTS";

export const updateProducts = (products) => {
  return (dispatch) => {
    dispatch({
      type: UPDATEPRODUCTS,
      products: products,
    });
  };
};
