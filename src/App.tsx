import React, { useState } from 'react';
import './App.css';
import { WORDS } from './data/words';
import WordGrid from './components/WordGrid';

const App = () => {
  const [wordOfTheDay, setWordOfTheDay] = useState("brief"); // ### TODO - pull this from WORDS by date
  const [wordOfTheDayArr, setWordOfTheDayArr] = useState(wordOfTheDay.split(""));

  const isValidWord = (guessWordArr: string[]) => {
    const guessWord = guessWordArr.join("").toLowerCase();
    return WORDS.includes(guessWord);
  }

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
