export default class Game {
  public currentWord: any;

  private indexesArray: number[];

  constructor(public wordsList: any[]) {
    this.indexesArray = this.wordsList.map((_w, i) => i);
  }

  nextWord(): any {
    if (this.indexesArray.length) {
      const randomIndex = Math.floor(Math.random() * this.indexesArray.length);
      const wordIndex = this.indexesArray[randomIndex];
      const gamingWord = this.wordsList[wordIndex];
      this.currentWord = gamingWord;
      this.indexesArray.splice(randomIndex, 1);

      return gamingWord;
    }
    return undefined;
  }
}
