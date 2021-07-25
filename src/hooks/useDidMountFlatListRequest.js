import { useState } from "react";
import useDidMountEffect from "./useDidMountEffect";

const useDidMountFlatListRequest = (request) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendRequest, setIsSendRequest] = useState(false);

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
      setIsSendRequest(false);
    }
  };

  useDidMountEffect(() => {
    if (isSendRequest === true) {
      sendRequest();
    }
  }, [isSendRequest]);

  return {
    data,
    isError,
    isLoading,
    setIsLoading,
    setIsSendRequest,
    setData,
  };
};

export default useDidMountFlatListRequest;
