import { useState, useCallback, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const history = useHistory();
  // ref => piece of data which will not be changed or re-initialized when the function re-run. useState() should be suitable for UI update
  const activeHttpRequests = useRef([]);
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      try {
        console.log(url);
        setIsLoading(true);
        // console.log(body, typeof body);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);
        const response = await fetch(url, {
          method,
          body,
          headers,
          // Link the abortCtrl to the http requests
          signal: httpAbortCtrl.signal,
        });
        const responseData = await response.json();
        // get parsed response body => request completed => remove the old completed request controllers
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );
        if (!response.ok) {
          throw new Error(responseData.error);
        }
        responseData.message && setMessage(responseData.message);
        setIsLoading(false);
        return responseData;
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
        throw error;
      }
    },
    []
  );
  // fix error => request is on the way, but the page is switched quickly

  const clearError = () => {
    setError(null);
  };

  const clearMessage = (url) => {
    setMessage(null);
    url && history.push(url);
  };
  // useEffect()
  useEffect(() => {
    // a clean-up function is executed to terminate/ end the Http requests before the next time useEffect() run again or whenever the components use this custom hook with useEffect() unmount/ remove
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);
  return { isLoading, error, message, sendRequest, clearError, clearMessage };
};
