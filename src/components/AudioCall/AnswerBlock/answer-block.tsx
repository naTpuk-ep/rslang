import React from "react";
import Button from "@material-ui/core/Button";
import Spinner from "../../Spinner";

import "./answer-block.scss";

// eslint-disable-next-line
const AnswerBlock = (props: any) => {
  const {
    wordsTranslations = [],
    onNextWord,
    wordTranslate,
    changeAnswerBlock,
    isAnswer,
  } = props;
  // eslint-disable-next-line
  const getAnswer = (e: any) => {
    let flag = false;
    const value = e.currentTarget.innerText.substr(2);
    if (value === wordTranslate) {
      flag = true;
    }
    changeAnswerBlock(flag);
  };

  const listItems = wordsTranslations.map((word: string, index: number) => {
    let correctWord = "";
    if (word === "") {
      return (
        <li>
          <Spinner />
        </li>
      );
    }
    if (word === wordTranslate && isAnswer) {
      correctWord = "correctWord";
    }
    return (
      <li key={word} className={`answer-list-item ${correctWord}`}>
        <span aria-hidden="true" onClick={(e) => getAnswer(e)}>
          {index + 1}.{word}
        </span>
      </li>
    );
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
        onClick={(e) => getAnswer(e)}
      >
        Не знаю
      </Button>
    </div>
  );
};

export default AnswerBlock;
