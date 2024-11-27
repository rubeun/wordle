import { useState, useEffect } from 'react';
import { cursorTo } from 'readline';
import styles from './WordGrid.module.css';

type WordRowActive = {
  currentGuessArr: string[];
};

type WordRow = {
  guessWordArr: string[];
  answerWordArr: string[];
};

type WordGrid = {
  allGuessesArr: string[][];
  answerWordArr: string[];
  currentGuessArr: string[];
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

const WordRow = ({ guessWordArr, answerWordArr }: WordRow) => {
  return (
    <div className={styles.wordRow}>
      {guessWordArr.map((guessLetter: string, index: number) => {
        const inAnswerWord = answerWordArr.includes(guessLetter);
        const isRightPlace = guessLetter === answerWordArr[index];
        return (
          <div
            key={`word-row-${index}`}
            className={`${styles.wordRowLetter} ${
              isRightPlace
                ? styles.rightLetterRightPlace
                : inAnswerWord
                ? styles.rightLetterWrongPlace
                : ""
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
  }: WordGrid) => {
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
          ? filledGuessesArr.map((wordArr: string[], index: number) => (
              <WordRow
                key={index}
                guessWordArr={wordArr}
                answerWordArr={answerWordArr}
              />
            ))
          : null}
        {filledGuessesArr.length < 6 ? (
          <WordRowActive currentGuessArr={currentGuessArr} />
        ) : null}
  
        {emptyArrays.length > 0
          ? emptyArrays.map((empty, index) => <WordRowEmpty key={index} />)
          : null}
      </div>
    );};

export default WordGrid;
