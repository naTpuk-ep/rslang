/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useActions from "./useActions";
import useTypedSelector from "./useTypeSelector";
import useUpdateStatistic from "./useUpdateStatistic";

const useAuthentication = () => {
  const {
    isAuthenticated,
    refreshToken,
    userId,
    name,
    loading,
    isRegistered,
    email,
    password,
    token,
  } = useTypedSelector((state) => state.auth);
  const {
    signIn,
    refreshTokens,
    setLoading,
    getStatistics,
    updateStatisticsAction,
  } = useActions();
  const { statistics, isFetching, isUpdated } = useTypedSelector(
    (state) => state.statistics
  );
  const { updateStatisticState } = useUpdateStatistic();

  useEffect(() => {
    if (userId && refreshToken && token && name) {
      refreshTokens(userId, refreshToken);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getStatistics(userId, token);
    }
    if (isRegistered && isAuthenticated) {
      updateStatisticsAction(statistics, userId, token);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isFetching && !isUpdated) {
      updateStatisticsAction(updateStatisticState(statistics), userId, token);
    }
  }, [statistics]);

  useEffect(() => {
    if (isRegistered) {
      signIn({ email, password });
    }
  }, [isRegistered]);

  return {
    isAuthenticated,
    loading,
  };
};

export default useAuthentication;
