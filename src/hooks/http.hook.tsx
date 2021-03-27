/* eslint-disable no-param-reassign */
import axios from "axios";
import { useState, useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string>("");

  const request = useCallback(
    async (url: string, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }

        const response = await axios({ method, url, data: body, headers });

        const { data } = response;

        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        if (error.response.data) setErrors(JSON.stringify(error.response.data));
        throw error;
      }
    },
    []
  );

  const clearError = useCallback(() => setErrors(""), []);

  return { loading, errors, request, clearError };
};

export default useHttp;
