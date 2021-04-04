import useHttp from "./http.hook";

const useWords = (): {
  loading: boolean;
  getWords: (count: number) => Promise<any>;
} => {
  const { loading, request } = useHttp();

  const getWords = async (count: number) => {
    return request(
      `https://rnovikov-rs-lang-back.herokuapp.com/words/group/1?count=${count}`,
      "GET"
    );
  };

  return { loading, getWords };
};

export default useWords;
