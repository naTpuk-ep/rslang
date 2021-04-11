/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { STORAGE_NAME } from "../constants/request-params";
import useActions from "./useActions";
import useTypedSelector from "./useTypeSelector";

const useAuthentication = () => {
  const {
    isAuthenticated,
    refreshToken,
    userId,
    name,
    loading,
  } = useTypedSelector((state) => state.auth);
  const { refreshTokens, setLoading } = useActions();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_NAME) || "{}");
    if (data && data.refreshToken && data.userId) {
      refreshTokens(data.userId, data.refreshToken);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem(
        STORAGE_NAME,
        JSON.stringify({
          refreshToken,
          userId,
          name,
        })
      );
    }
  }, [isAuthenticated]);

  return {
    isAuthenticated,
    loading,
  };
};

export default useAuthentication;
