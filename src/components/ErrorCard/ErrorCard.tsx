/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

interface ErrorCardProps {
  message: string;
}

const ErrorCard: React.FunctionComponent<ErrorCardProps> = (
  props: ErrorCardProps
) => {
  const { message } = props;
  return <div />;
};

export default ErrorCard;
