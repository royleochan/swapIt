const filterProducts = (products, filterState) => {
  if (filterState.minPrice !== null && filterState.maxPrice !== null) {
    return products.filter(
      (product) =>
        filterState.minPrice <= product.minPrice &&
        filterState.maxPrice >= product.maxPrice
    );
  } else {
    return products;
  }
};

export default filterProducts;
