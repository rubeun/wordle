import React, { useState, useEffect } from 'react';
import './App.css';
import { WORDS } from './data/words';
import WordGrid from './components/WordGrid';
import KeyboardGrid from './components/KeyboardGrid';
import Popup from './components/Popup';
import Header from './components/Header';
import { useUserInfo } from './hooks/useUserInfo';

const App = () => {
  const [wordOfTheDay, setWordOfTheDay] = useState<string>(WORDS[0]); // ### TODO - pull this from WORDS by date
  const [wordOfTheDayArr, setWordOfTheDayArr] = useState<string[]>(wordOfTheDay.split(""));

  const [wordFound, setWordFound] = useState<boolean>(false);
  const [wordStatus, setWordStatus] = useState<string>(""); // 4 states: correct, invalid, duplicate, short
  const [currentGuessArr, setCurrentGuessArr] = useState<string[]>([]);
  const [allGuessesArr, setAllGuessesArr] = useState<string[][]>([]);  

  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [letterExists, setLetterExists] = useState<string[]>([]);
  const [rightPlace, setRightPlace] = useState<string[]>([]);

  const { userInfo, addWin, addLoss, addPreviousWordOfTheDay } = useUserInfo();

  // Checks if valid 5-letter word (in WORDS)
  const isValidWord = (guessWordArr: string[]) => {
    const guessWord = guessWordArr.join("").toLowerCase();
    return WORDS.includes(guessWord);
  }

  // Checks if word is a previously guessed valid word
  const wordAlreadySubmitted = (guessWordArr: string[]) => {
    let alreadySubmitted = false;
    allGuessesArr.forEach((prevGuess) => {
      if (prevGuess.join("") === guessWordArr.join("")) {
        alreadySubmitted = true;
      }
    });
    return alreadySubmitted;
  };

  // Checks if it is wordOfTheDay
  const isWordOfTheDay = (guessWordArr: string[]) => {
    if (guessWordArr.join("") === wordOfTheDay) {
      return true;
    } else {
      return false;
    }
  };

  // Load new random word
  const loadNewWord = () => {
    const totalNumWords = WORDS.length;
    const newWordIndex = Math.floor(Math.random() * totalNumWords);
    setWordOfTheDay(WORDS[newWordIndex]);
    setWordOfTheDayArr(WORDS[newWordIndex].split(""));
  }

  // Reset grid and loads next word
  const resetBoard = () => {
    setAllGuessesArr([]);
    setWrongLetters([]);
    setLetterExists([]);
    setRightPlace([]);
    setWordFound(false);
    setWordStatus("");
    loadNewWord();
  }

  const handleGuessEntry = (keyPressed: string) => {
    let guessLetters: string[] = [...currentGuessArr];

    // Don't allow typing when word is found
    if (wordFound) {
      return null;
    }

    // Don't allow typing when all guesses used up
    if (allGuessesArr.length > 5) {
      return null;
    }

    // Reset status on new key input
    setWordStatus("");

    if (keyPressed === "Backspace" || keyPressed === "Delete") {
      guessLetters.pop();
      console.log("Deleted Letter: ", guessLetters);
      setCurrentGuessArr(guessLetters);
    } else if (keyPressed === "Enter") {
      if (currentGuessArr.length === 5) {
        if (isValidWord(currentGuessArr)) {
          if (wordAlreadySubmitted(currentGuessArr)) {
            console.log("Word Already Submitted");
            setWordStatus("duplicate")
          } else {
            console.log("Valid Word Submitted");
            let tempAllWords = [...allGuessesArr];
            tempAllWords.push(currentGuessArr);
            if (isWordOfTheDay(currentGuessArr)) {
              setWordFound(true);
              setWordStatus("correct");
              console.log("CORRECT WORD GUESSED!");
              addWin();
              addPreviousWordOfTheDay(wordOfTheDay);
            } else {
              console.log("Not the word of the day :(");
              // ##### TODO: Check if all 6 guesses used up
              if (allGuessesArr.length > 5) {
                console.log("Ran out of Guesses!");
              }
            }
            setCurrentGuessArr([]); // Clear Guess Word

            // ## Fill in arrays for right place, letter exists and wrong letters
            // currentGuessArr - what the user just GUESSED
            // use the currentGuess word to compare with word of the day
            // fill in wrongLetters, lettersExists, rightPlace array
            for (let i = 0; i < currentGuessArr.length; i++) {
              if (currentGuessArr[i] === wordOfTheDayArr[i]) {
                setRightPlace((prevRightPlace) => [
                  ...prevRightPlace,
                  currentGuessArr[i],
                ]);
              } else if (wordOfTheDayArr.indexOf(currentGuessArr[i]) !== -1) {
                setLetterExists((prevLetterExists) => [
                  ...prevLetterExists,
                  currentGuessArr[i],
                ]);
              } else {
                setWrongLetters((prevWrongLetters) => [
                  ...prevWrongLetters,
                  currentGuessArr[i],
                ]);
              }
            }
            setAllGuessesArr(tempAllWords);
          }
        } else {
          console.log("Invalid Word Submitted");
          setWordStatus("invalid");
        }
        // setCurrentGuessArr([]); // Reset Guess Word
      } else {
        console.log("Invalid length, must be 5 letters");
        setWordStatus("short");
      }
      console.log("All Guesses: ", allGuessesArr);
    } else if (guessLetters.length < 5) {   // Enter Letters - Alphabets Only
      const regex = /^[a-zA-Z]/;
      if (regex.test(keyPressed) && keyPressed.length === 1) {
        guessLetters.push(keyPressed.toLowerCase());
        console.log("Added Letter: ", guessLetters);
        setCurrentGuessArr(guessLetters);
      }
    }  
  };

  // Load Random Word of the Day
  useEffect(() => {
    loadNewWord();
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", handleTypeEntry);

    return () => {
      window.removeEventListener("keydown", handleTypeEntry);
    };
  }, [handleGuessEntry]);

  // Remove popup after a 2s delay
  useEffect(() => {
    let delayedMessage: any;
    if (wordStatus === "invalid" 
          // || wordStatus === "correct" 
          || wordStatus === "duplicate"
          || wordStatus === "short"
        ) {
      delayedMessage = setTimeout(() => {
        setWordStatus("");
      }, 2000);
    }
    return () => clearTimeout(delayedMessage);
  }, [wordStatus]);

  const handleClickEntry = (keyPressed: string) => {
    console.log("Clicked: ", keyPressed);
    handleGuessEntry(keyPressed);
  };

  const handleTypeEntry = (event: any) => {
    const keyPressed = event.key;
    handleGuessEntry(keyPressed);
  };

  return (
    <div className="container">
      <Header />
      <Popup 
        wordStatus={wordStatus} 
        wordOfTheDay={wordOfTheDay}
        userInfo={userInfo}
        resetBoard={resetBoard} 
      />
      <WordGrid
        allGuessesArr={allGuessesArr}
        answerWordArr={wordOfTheDayArr}
        currentGuessArr={currentGuessArr}
        wordStatus={wordStatus}
      />
      <KeyboardGrid
        wrongLetters={wrongLetters}
        letterExists={letterExists}
        rightPlace={rightPlace}
        handleClickEntry={handleClickEntry}
      />
    </div>
  );
}

export default App;
