import React, { FunctionComponent } from "react";
import Button from "@material-ui/core/Button";

import "./AnswerBlock.scss";
import { Box } from "@material-ui/core";
import useKeyDown from "../../../hooks/useKeyDown";

interface IAnswerBlock {
  wordsTranslations: string[];
  onNextWord: () => void;
  wordTranslate: string;
  changeAnswerBlock: (flag: boolean) => void;
  isAnswer: boolean;
}
const AnswerBlock: FunctionComponent<IAnswerBlock> = (props: IAnswerBlock) => {
  const {
    wordsTranslations = [],
    onNextWord,
    wordTranslate,
    changeAnswerBlock,
    isAnswer,
  } = props;

  const getAnswer = (e: React.MouseEvent<HTMLButtonElement> | null = null) => {
    let flag = false;
    if (e) {
      const value = e.currentTarget.innerText.substr(2);
      if (value === wordTranslate) {
        flag = true;
      }
    }
    changeAnswerBlock(flag);
  };

  const listItems = wordsTranslations.map((word: string, index: number) => {
    let correctWord = "";
    const randomKey = `${Math.random() * 1000}${word}`;
    if (word === wordTranslate && isAnswer) {
      correctWord = "correctWord";
    }
    return (
      <li key={randomKey} className={`answer-list-item ${correctWord}`}>
        <span
          aria-hidden="true"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => getAnswer(e)}
        >
          {index + 1}.{word}
        </span>
      </li>
    );
  });

  const EnterLabel = (
    <Box p={2} mt={1}>
      Or press &quot;ENTER&quot;
    </Box>
  );

  useKeyDown("Enter", () => {
    if (isAnswer) {
      onNextWord();
    } else {
      getAnswer();
    }
  });

  if (isAnswer) {
    return (
      <div className="answer-block">
        <ol className="answer-block-list list-answer">{listItems}</ol>
        <Button
          variant="contained"
          color="primary"
          className="answer-block-button"
          onClick={() => onNextWord()}
        >
          Слудующее
        </Button>
        {EnterLabel}
      </div>
    );
  }
  return (
    <div className="answer-block">
      <ol className="answer-block-list">{listItems}</ol>
      <Button
        variant="contained"
        color="primary"
        className="answer-block-button"
        onClick={() => getAnswer()}
      >
        Не знаю
      </Button>
      {EnterLabel}
    </div>
  );
};

export default AnswerBlock;
