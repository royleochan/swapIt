const filterProducts = (products, filterState) => {
  if (filterState.minPrice !== null && filterState.maxPrice !== null) {
    return products.filter(
      (product) =>
        product.minPrice >= filterState.minPrice &&
        product.maxPrice <= filterState.maxPrice
    );
  } else {
    return products;
  }
};

export default filterProducts;
