import React, { useEffect, useState } from "react";
import axios from "axios";
import GameSprint from "../components/GameSprint";

import "./App.scss";

const App: React.FunctionComponent = () => {
  const [words, setWords] = useState(null);

  useEffect(() => {
    console.log("FETCH");
    const fetchData = async () => {
      const result = await axios(
        "https://rnovikov-rs-lang-back.herokuapp.com/words/group/1?count=50"
      );
      setWords(result.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <GameSprint data={words} />
    </>
  );
};

export default App;
