import { useCallback, useEffect, useState } from "react";

export const useQueries = ({ prefixUrl = "", headers = {} } = {}) => {
  const [data, setData] = useState({
    data: null,
    isLoading: true,
    isError: false,
  });

  const fetchingData = useCallback(
    async ({ url = "", method = "GET", headers = {} } = {}) => {
      try {
        const response = await fetch(url, { method, headers });
        const result = await response.json();
        setData({
          ...data,
          data: result,
          isLoading: false,
        });
      } catch (error) {
        setData({
          ...data,
          isError: true,
          isLoading: false,
        });
      }
    },
    []
  );

  useEffect(() => {
    if (prefixUrl) {
      fetchingData({ url: prefixUrl, headers });
    }
  }, []);

  return { ...data };
};
