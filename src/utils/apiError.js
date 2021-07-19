/**
 * Custom function to handle api errors. This is needed to handle axios timeout errors.
 * A default message will be thrown for timeout errors while for other errors the error message is obtained from the backend.
 *
 * @param err error object
 * @throws Error object containing error message from backend or default error message for requests which have 502 timeout error
 */
const throwApiError = (err) => {
  if (err.code === "ECONNABORTED") {
    console.error(err.message);
    throw new Error("Something went wrong");
  } else {
    console.error(err.response.data.message);
    throw new Error(err.response.data.message);
  }
};

export default throwApiError;
