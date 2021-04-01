export default class Game {
  public currentWord: any;

  private index: number;

  constructor(public wordsList: any[]) {
    this.index = 0;
  }

  nextWord(): any {
    const nextWord = this.wordsList[this.index];
    this.index += 1;
    return nextWord;
  }
}
