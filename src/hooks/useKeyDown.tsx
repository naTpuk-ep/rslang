/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

const useKeyDown = (key: string, callBack: (...args: any[]) => void): void => {
  // const cbRef = useRef(callBack);
  // useEffect(() => {
  //   cbRef.current = callBack;
  // });
  useEffect(() => {
    const handler = (event: any) => {
      if (event.code === key) {
        event.preventDefault();
        callBack(event);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });
};
export default useKeyDown;
