import IWordData from "../../types/words-types";

/* eslint-disable @typescript-eslint/lines-between-class-members */
export default class Game {
  currentWord: IWordData | undefined;
  isFinish: boolean;

  private index: number;

  constructor(public wordsList: IWordData[]) {
    this.index = 0;
    this.isFinish = false;
  }

  static summarize(string: string): string {
    return string.trim().toLowerCase();
  }

  nextWord(): IWordData {
    this.currentWord = this.wordsList[(this.index += 1)];
    if (!this.currentWord) {
      this.isFinish = true;
    }
    return this.currentWord;
  }

  startsWith(value: string): boolean {
    return Game.summarize(this.currentWord!.word).startsWith(
      Game.summarize(value)
    );
  }

  isCorrect(value: string): boolean {
    return Game.summarize(value) === Game.summarize(this.currentWord!.word);
  }
}
