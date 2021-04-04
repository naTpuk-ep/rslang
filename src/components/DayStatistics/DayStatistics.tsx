/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import useTypedSelector from "../../hooks/useTypeSelector";

const DayStatistics = () => {
  const { statistics } = useTypedSelector((state) => state.statistics);

  return <div />;
};

export default DayStatistics;
