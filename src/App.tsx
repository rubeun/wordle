import React from 'react';
import './App.css';
import { WORDS } from './data/words';
import WordGrid from './components/WordGrid';

const App = () => {
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
