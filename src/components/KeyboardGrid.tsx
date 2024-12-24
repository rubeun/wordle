import { useState, useEffect } from "react";
import styles from './KeyboardGrid.module.css';

type KeyboardButton = {
  letter: string;
  handleClickEntry: any;
};

type KeyboardGrid = {
  wrongLetters: string[];
  letterExists: string[];
  rightPlace: string[];
  handleClickEntry: any;
};

const KeyboardButton = ({ letter, handleClickEntry }: KeyboardButton) => {
  return <button onClick={() => handleClickEntry(letter)}>{letter}</button>;
};

/* 
	Possible solution:
	 Refactor keyboardRows into an array of objects with letter and colour status
	 
*/

const KeyboardGrid = ({
  wrongLetters,
  letterExists,
  rightPlace,
  handleClickEntry,
}: KeyboardGrid) => {
  const keyboardRow1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
  const keyboardRow2 = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
  const keyboardRow3 = [
    "Enter",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    "Backspace",
  ];

  return (
    <div className={styles.keyboardGrid}>
      <div className="keyboardRow1">
        {keyboardRow1.map((letter, index) => (
          <KeyboardButton letter={letter} handleClickEntry={handleClickEntry} />
        ))}
      </div>
      <div className="keyboardRow2">
        {keyboardRow2.map((letter, index) => (
          <KeyboardButton letter={letter} handleClickEntry={handleClickEntry} />
        ))}
      </div>
      <div className="keyboardRow3">
        {keyboardRow3.map((letter, index) => (
          <KeyboardButton letter={letter} handleClickEntry={handleClickEntry} />
        ))}
      </div>
    </div>
  );
};

export default KeyboardGrid;
