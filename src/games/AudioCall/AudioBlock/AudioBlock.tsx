import React, { FunctionComponent, useEffect } from "react";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import useSound from "use-sound";
import "./AudioBlock.scss";
import { Box } from "@material-ui/core";
import { BACKEND_PATH } from "../../../constants/request-params";
import useKeyDown from "../../../hooks/useKeyDown";

interface IAudioProps {
  audio: string;
  image: string;
  isAnswer: boolean;
  word: string;
}

const AudioBlock: FunctionComponent<IAudioProps> = ({
  audio,
  image = "",
  isAnswer = false,
  word = "",
}: IAudioProps) => {
  const [play] = useSound(`${BACKEND_PATH}${audio}`);
  useEffect(() => {
    play();
  }, [play]);

  useKeyDown("Space", play);

  const imageElement = (
    <img
      src={`${BACKEND_PATH}${image}`}
      className="audio-block-image"
      alt="answer-img"
    />
  );

  const SpaceLabel = (
    <Box p={2} mt={1}>
      Press &quot;SPACE&quot; to play the word
    </Box>
  );

  if (isAnswer) {
    return (
      <>
        {imageElement}
        <div className="audio-block-container">
          <button
            type="button"
            className="audio-block-answer"
            onClick={() => play()}
          >
            <VolumeDownIcon className="audio-block-icon" />
          </button>
          <span className="audio-block-word">{word}</span>
        </div>
        {SpaceLabel}
      </>
    );
  }
  return (
    <>
      <button type="button" className="audio-block" onClick={() => play()}>
        <VolumeDownIcon className="audio-block-icon" />
      </button>
      {SpaceLabel}
    </>
  );
};

export default AudioBlock;
