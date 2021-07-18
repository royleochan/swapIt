/**
 * Custom function to handle api errors. This is needed because timeout errors do not have a custom message for error handling.
 * Thus, a default message is thrown for timeout errors while for other errors the error message is obtained from the backend.
 *
 * @param err error object
 * @throws Error object containing error message from backend or default error message for requests which have 502 timeout error
 */
const throwApiError = (err) => {
  if (err.response.status === 502) {
    throw new Error("Something went wrong");
  } else {
    throw new Error(err.response.data.message);
  }
};

export default throwApiError;
