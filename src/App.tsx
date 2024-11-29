import React, { useState, useEffect } from 'react';
import './App.css';
import { WORDS } from './data/words';
import WordGrid from './components/WordGrid';

const App = () => {
  const [wordOfTheDay, setWordOfTheDay] = useState<string>("brief"); // ### TODO - pull this from WORDS by date
  const [wordOfTheDayArr, setWordOfTheDayArr] = useState<string[]>(wordOfTheDay.split(""));

  const [wordStatus, setWordStatus] = useState<string>("");
  const [currentGuessArr, setCurrentGuessArr] = useState<string[]>([]);
  const [allGuessesArr, setAllGuessesArr] = useState<string[][]>([]);  

  // Checks if valid 5-letter word (in WORDS)
  const isValidWord = (guessWordArr: string[]) => {
    const guessWord = guessWordArr.join("").toLowerCase();
    return WORDS.includes(guessWord);
  }

  const wordAlreadySubmitted = (guessWordArr: string[]) => {
    let alreadySubmitted = false;
    allGuessesArr.forEach((prevGuess) => {
      if (prevGuess.join("") == guessWordArr.join("")) {
        alreadySubmitted = true;
      }
    });
    return alreadySubmitted;
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

    if (wordStatus === "correct") {
      return null;
    }

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
              setWordStatus("correct");
              console.log("CORRECT WORD GUESSED!");
            } else {
              console.log("Not the word of the day :(");
            }
            setAllGuessesArr(tempAllWords);
          }
        } else {
          console.log("Invalid Word Submitted");
          setWordStatus("wrong");
        }
        setCurrentGuessArr([]); // Reset Guess Word
      } else {
        console.log("Invalid length, must be 5 letters");
      }
      console.log("All Guesses: ", allGuessesArr);
    } else if (guessLetters.length < 5) {
      setWordStatus("");
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
      <WordGrid
        allGuessesArr={allGuessesArr}
        answerWordArr={wordOfTheDayArr}
        currentGuessArr={currentGuessArr}
        wordStatus={wordStatus}
      />
    </div>
  );
}

export default App;
