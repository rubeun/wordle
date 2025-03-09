import { useState, useEffect } from 'react';
import styles from './WordGrid.module.css';

type WordRowActiveType = {
  currentGuessArr: string[];
  wordStatus: string;
};

type WordRowWinningType = {
  winningLetters: string[];
};

type WordRowType = {
  guessWordArr: string[];
  answerWordArr: string[];
};

type WordGridType = {
  allGuessesArr: string[][];
  answerWordArr: string[];
  currentGuessArr: string[];
  wordStatus: string,
};

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

const WordRowActive = ({ currentGuessArr, wordStatus }: WordRowActiveType) => {
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
            className={`${styles.wordRowLetter} ${
              wordStatus === "invalid" || wordStatus === "duplicate" || wordStatus === "short"
                ? styles.shakeWords 
                : ""}`}
          >
            {guessLetter}
          </div>
        );
      })}
    </div>
  );
};

const WordRowWinning = ({ winningLetters }: WordRowWinningType) => {
  return (
    <div className={styles.wordRow}>
      {winningLetters.map((letter: string, index: number) => {
        return (
          <div
            key={`word-row-winning-${index}`}
            className={`${styles.wordRowLetter} ${styles.rightLetterRightPlace} ${styles.rightWord}`}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}

const WordRow = ({ guessWordArr, answerWordArr }: WordRowType) => {
  return (
    <div className={styles.wordRow}>
      {guessWordArr.map((guessLetter: string, index: number) => {
        const isRightPlace = guessLetter === answerWordArr[index];
        const isWrongPlace = answerWordArr.includes(guessLetter); // ### BUG: Needs to be FALSE if letter IS in the Right Place elsewhere if more than 1
        return (
          <div
            key={`word-row-${index}`}
            className={`${styles.wordRowLetter} ${
              isRightPlace
                ? styles.rightLetterRightPlace
                : isWrongPlace
                  ? styles.rightLetterWrongPlace  // #### BUG : Don't show if letter is guessed
                  : styles.wrongLetter
            }`}
          >
            {guessLetter}
          </div>
        );
      })}
    </div>
  );
};

const WordGrid = ({
  allGuessesArr,
  answerWordArr,
  currentGuessArr,
  wordStatus,
  }: WordGridType) => {
    const [filledGuessesArr, setFilledGuessesArr] = useState<string[][]>([]);
    const [emptyArrays, setEmptyArrays] = useState<string[]>([]);
    useEffect(() => {
      let tempEmpty = [];
      if (allGuessesArr.length < 6) {
        tempEmpty = Array(5 - allGuessesArr.length).fill(["", "", "", "", ""]);
      }
      setEmptyArrays([...tempEmpty]);
      setFilledGuessesArr([...allGuessesArr]);
    }, [allGuessesArr]);

    return (
      <div className={styles.wordGrid}>
        {filledGuessesArr.length > 0
          ? filledGuessesArr.map((wordArr: string[], index: number) => {
            const wordString =  wordArr.join("");
            const answerString = answerWordArr.join("");
            if (wordString == answerString) {
              return (
                <WordRowWinning winningLetters={answerWordArr} />
              );

            } else {
              return (
                <WordRow
                  key={index}
                  guessWordArr={wordArr}
                  answerWordArr={answerWordArr}
                />
              );
            }
          })
          : null}
        {filledGuessesArr.length < 6 ? (
          <WordRowActive currentGuessArr={currentGuessArr} wordStatus={wordStatus} />
        ) : null}
  
        {emptyArrays.length > 0
          ? emptyArrays.map((empty, index) => <WordRowEmpty key={index} />)
          : null}
      </div>
    );};

export default WordGrid;
