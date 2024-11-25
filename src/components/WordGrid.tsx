import styles from './WordGrid.module.css';

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

const WordGrid = () => {
  return (
    <div className={styles.wordGrid}>
      <WordRowEmpty />
    </div>
  );
};

export default WordGrid;
