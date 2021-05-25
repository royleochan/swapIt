const sortProducts = (products, sortState) => {
  if (sortState[0]) {
    return products.sort(
      (productOne, productTwo) =>
        new Date(productTwo.createdAt) - new Date(productOne.createdAt)
    );
  } else if (sortState[1]) {
    return products.sort(
      (productOne, productTwo) => productOne.minPrice - productTwo.minPrice
    );
  } else if (sortState[2]) {
    return products.sort(
      (productOne, productTwo) => productTwo.minPrice - productOne.minPrice
    );
  } else if (sortState[3]) {
    return products.sort(
      (productOne, productTwo) => productOne.maxPrice - productTwo.maxPrice
    );
  } else if (sortState[4]) {
    return products.sort(
      (productOne, productTwo) => productTwo.maxPrice - productOne.maxPrice
    );
  } else {
    return products.sort();
  }
};

export default sortProducts;
