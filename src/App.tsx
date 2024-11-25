import React, { useState, useEffect } from 'react';
import './App.css';
import { WORDS } from './data/words';
import WordGrid from './components/WordGrid';

const App = () => {
  const [wordOfTheDay, setWordOfTheDay] = useState<string>("brief"); // ### TODO - pull this from WORDS by date
  const [wordOfTheDayArr, setWordOfTheDayArr] = useState<string[]>(wordOfTheDay.split(""));

  const [wordFound, setWordFound] = useState<boolean>(false);
  const [currentGuessArr, setCurrentGuessArr] = useState<string[]>([]);
  const [allGuessesArr, setAllGuessesArr] = useState<string[][]>([]);  

  // Checks if valid 5-letter word (in WORDS)
  const isValidWord = (guessWordArr: string[]) => {
    const guessWord = guessWordArr.join("").toLowerCase();
    return WORDS.includes(guessWord);
  }

  const wordAlreadySubmitted = (guessWordArr: string[]) => {
    let wordFound = false;
    allGuessesArr.forEach((prevGuess) => {
      if (prevGuess.join("") == guessWordArr.join("")) {
        wordFound = true;
      }
    });
    return wordFound;
  };

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

    if (keyPressed === "Backspace" || keyPressed === "Delete") {
      guessLetters.pop();
      console.log("Deleted Letter: ", guessLetters);
      setCurrentGuessArr(guessLetters);
    } else if (keyPressed === "Enter") {
      if (currentGuessArr.length === 5) {
        if (isValidWord(currentGuessArr)) {
          if (wordAlreadySubmitted(currentGuessArr)) {
            console.log("Word Already Submitted");
          } else {
            console.log("Valid Word Submitted");
            let tempAllWords = [...allGuessesArr];
            tempAllWords.push(currentGuessArr);
            if (isWordOfTheDay(currentGuessArr)) {
              setWordFound(true);
              console.log("CORRECT WORD GUESSED!");
            } else {
              console.log("Not the word of the day :(");
            }
            setAllGuessesArr(tempAllWords);
          }
        } else {
          console.log("Invalid Word Submitted");
        }
        setCurrentGuessArr([]); // Reset Guess Word
      } else {
        console.log("Invalid length, must be 5 letters");
      }
    } else if (guessLetters.length < 5) {
      guessLetters.push(keyPressed);
      console.log("Added Letter: ", guessLetters);
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
      {wordFound ? (
        <div>
          <h3>Word Found!</h3>
        </div>
      ) : null}
      <WordGrid currentGuessArr={currentGuessArr} />
    </div>
  );
}

export default App;
