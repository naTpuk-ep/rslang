/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { GET_USER_LEARN_WORDS_FILTER } from "../../constants/request-params";
import useActions from "../../hooks/useActions";
import useTypedSelector from "../../hooks/useTypeSelector";

interface UnitStatisticsParams {
  group: number;
}

const UnitStatistics: React.FunctionComponent<UnitStatisticsParams> = (
  props: UnitStatisticsParams
) => {
  const { group: unitNumber } = props;
  const { unit, isFetching } = useTypedSelector(
    (state) => state.unitStatistics
  );
  const { userId, token } = useTypedSelector((state) => state.auth);
  const { aggregatedWords } = useTypedSelector((state) => state.userWords);
  const { getUnitStatisticsAction } = useActions();

  useEffect(() => {
    getUnitStatisticsAction(
      unitNumber,
      userId,
      token,
      JSON.stringify(GET_USER_LEARN_WORDS_FILTER)
    );
  }, [aggregatedWords]);

  return <>{isFetching ? "LOAD" : <>{unit.count}</>}</>;
};

export default UnitStatistics;
