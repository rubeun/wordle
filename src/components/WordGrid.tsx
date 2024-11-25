import { cursorTo } from 'readline';
import styles from './WordGrid.module.css';

type WordRowActive = {
  currentGuessArr: string[];
};

type WordGrid = {
  currentGuessArr: string[],
}

const WordRowEmpty = () => {
  const emptyLetters = ["", "", "", "", ""];

  return (
    <div className={styles.wordRow}>
      {emptyLetters.map((letter: string, index: number) => {
        return (
          <div
            key={`word-row-empty-${index}`}
            className={styles.wordRowLetter}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
};

const WordRowActive = ({ currentGuessArr }: WordRowActive) => {
  let filledGuessArr = [];
  if (currentGuessArr.length < 5) {
    const emptyLetters = Array(5 - currentGuessArr.length).fill("");
    filledGuessArr = [...currentGuessArr, ...emptyLetters];
  } else {
    filledGuessArr = [...currentGuessArr];
  }

  return (
    <div className={styles.wordRow}>
      {filledGuessArr.map((guessLetter: string, index: number) => {
        return (
          <div
            key={`word-row-active-${index}`}
            className={styles.wordRowLetter}
          >
            {guessLetter}
          </div>
        );
      })}
    </div>
  );
};

const WordGrid = ({ currentGuessArr }: WordGrid) => {
  return (
    <div className={styles.wordGrid}>
      <WordRowActive currentGuessArr={currentGuessArr} />
      <WordRowEmpty />
    </div>
  );
};

export default WordGrid;
