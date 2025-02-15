import styles from './Popup.module.css';

type UserInfoType = {
  username: string,
  wins: number,
  losses: number,
  guessIn1: number,
  guessIn2: number,
  guessIn3: number,
  guessIn4: number,
  guessIn5: number,
  guessIn6: number,
  previousWordOfTheDays: string[],
}

type PopupType = {
  wordStatus: string;
  wordOfTheDay: string;
  userInfo: UserInfoType;
  resetBoard: any;
}

const Popup = ({ wordStatus, wordOfTheDay, userInfo, resetBoard }: PopupType) => {
  const wins = userInfo.wins;
  const losses =  (userInfo.previousWordOfTheDays.length) - userInfo.wins;
  return (
    <div className={styles.popupContainer}>
      {wordStatus === "correct" 
        ? ( <div>
              <h3>Correct Word <span className={styles.greenWord}>{wordOfTheDay}</span> Guessed!</h3>
              <h5>Wins: {wins}</h5>
              <h5>Losses: {losses}</h5>
              <h5><button onClick={resetBoard}>Load Next Word</button></h5>
            </div>)
        : wordStatus === "duplicate"
          ? (<div>Already guessed</div>)
          : wordStatus === "invalid"
            ? (<div>Invalid Word!</div>)
            : wordStatus === "short"
              ? (<div>Word too short!</div>)
              : wordStatus === "lost"
                ? ( <div>
                  <h3>The Correct Word was <span className={styles.greenWord}>{wordOfTheDay}</span></h3>
                  <h5>Wins: {wins}</h5>
                  <h5>Losses: {losses}</h5>
                  <h5><button onClick={resetBoard}>Load Next Word</button></h5>
                </div>)
                : null  
      }
    </div>
  );
}
 
export default Popup;