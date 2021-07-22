import { useState, useEffect } from "react";

const useFlatListRequest = (request) => {
  const [data, setData] = useState();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const sendRequest = async () => {
    try {
      const response = await request();
      if (response) {
        setData(response.data);
        setIsError(false);
      }
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isRefreshing === true || isLoading === true) {
      sendRequest();
    }
  }, [isRefreshing]);

  return { data, isError, isRefreshing, isLoading, setIsRefreshing };
};

export default useFlatListRequest;
