/**
 * Filters product according to filter state
 *
 * @param products array of products to be filtered
 * @param filterState object of shape {maxprice: <Number>, minPrice: <Number>}
 * @returns array of filtered products
 */
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
