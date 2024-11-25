import React, { useState, useEffect } from 'react';
import './App.css';
import { WORDS } from './data/words';
import WordGrid from './components/WordGrid';

const App = () => {
  const [wordOfTheDay, setWordOfTheDay] = useState<string>("brief"); // ### TODO - pull this from WORDS by date
  const [wordOfTheDayArr, setWordOfTheDayArr] = useState<string[]>(wordOfTheDay.split(""));

  const [wordFound, setWordFound] = useState<boolean>(false);
  const [currentGuessArr, setCurrentGuessArr] = useState<string[]>([]);

  // Checks if valid 5-letter word (in WORDS)
  const isValidWord = (guessWordArr: string[]) => {
    const guessWord = guessWordArr.join("").toLowerCase();
    return WORDS.includes(guessWord);
  }

  // Checks the letter to see if its in the word.
  const letterInWord = (guessLetter: string) => {
    const wordOfTheDayArr = wordOfTheDay.split("");
    return wordOfTheDayArr.includes(guessLetter.toLowerCase());
  };

  // Checks if is wordOfTheDay
  const isWordOfTheDay = (guessWordArr: string[]) => {
    if (guessWordArr.join("") == wordOfTheDay) {
      return true;
    } else {
      return false;
    }
  };

  const handleGuessEntry = (event: KeyboardEvent) => {
    const keyPressed: string = event.key;
    let guessLetters: string[] = [...currentGuessArr];
    console.log("Key pressed: ", keyPressed);
    
    if (guessLetters.length < 5) {
      guessLetters.push(keyPressed);
      setCurrentGuessArr(guessLetters);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleGuessEntry);

    return () => {
      window.removeEventListener("keydown", handleGuessEntry);
    };
  }, [handleGuessEntry]);


  return (
    <div className="container">
      <header className="header">
        <h1>Rubeun's Wordle App</h1>
      </header>
      <WordGrid />
    </div>
  );
}

export default App;
