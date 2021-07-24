import { useState } from "react";
import useDidMountEffect from "./useDidMountEffect";

const useDidMountFlatListRequest = (request) => {
  const [data, setData] = useState([]);
  const [hasSentRequest, setHasSentRequest] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      setHasSentRequest(true);
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useDidMountEffect(() => {
    if (isRefreshing === true || isLoading === true) {
      sendRequest();
    }
  }, [isRefreshing]);

  return {
    data,
    isError,
    isRefreshing,
    isLoading,
    setIsRefreshing,
    hasSentRequest,
  };
};

export default useDidMountFlatListRequest;
