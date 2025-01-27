import { useMemo } from "react";
import styles from './KeyboardGrid.module.css';

type KeyInfo = {
  letter: string;
  status: string;
}

type KeyboardButton = {
  letter: KeyInfo;
  handleClickEntry: any;
};

type KeyboardGrid = {
  wrongLetters: string[];
  letterExists: string[];
  rightPlace: string[];
  handleClickEntry: any;
};

const KeyboardButton = ({ letter, handleClickEntry }: KeyboardButton) => {
  console.log("Letter: ", letter);
    return (
      <button
        className={`${styles.keyboardKey} ${styles[letter.status]}`}
        onClick={() => handleClickEntry(letter.letter)}
      >{letter.letter}</button>
    );
};

const KeyboardGrid = ({
  wrongLetters,
  letterExists,
  rightPlace,
  handleClickEntry,
}: KeyboardGrid) => {
  const keyboard = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["Enter","z","x","c","v","b","n","m", "Backspace"]];

  const getKeyboardRow = (letterArr: string[]) => {
    const newRow = letterArr.map((letter, index) => {
      let letterStatus = "";
      if (rightPlace.indexOf(letter) !== -1) {
        letterStatus = "rightLetter";
      } else if (letterExists.indexOf(letter) !== -1) {
        letterStatus = "wrongPlace";
      } else if (wrongLetters.indexOf(letter) !== -1) {
        letterStatus = "wrongLetter";
      }
      return { letter: letter, status: letterStatus };
    });
    return newRow;
  };

  const keyboardRow1 = useMemo(() => {
    return getKeyboardRow(keyboard[0]);
  }, [wrongLetters, letterExists, rightPlace]);

  const keyboardRow2 = useMemo(() => {
    return getKeyboardRow(keyboard[1]);
  }, [wrongLetters, letterExists, rightPlace]);

  const keyboardRow3 = useMemo(() => {
    return getKeyboardRow(keyboard[2]);
  }, [wrongLetters, letterExists, rightPlace]);

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
