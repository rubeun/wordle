import { useEffect, useState  } from 'react';
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

type PopupScoreType = {
  messageString: string, 
  correctWord: string, 
  userInfo: UserInfoType, 
  delaySeconds: number,
  resetBoard: any,
}

type PopupToastType = {
  messageString: string, 
}

type PopupType = {
  wordStatus: string;
  wordOfTheDay: string;
  userInfo: UserInfoType;
  resetBoard: any;
}

const GuessDistribution = ({ userInfo }: any) => {
  const numberOfWins = userInfo.wins;
  let percentagesArr = [];

  for (let i = 1; i < 7; i++) {
    const percentage = ((userInfo[`guessIn${i}`] / numberOfWins) * 100)
    percentagesArr.push({
      width: `${percentage}%`
    })
  }

  return (
    <div className={styles.guessInfo}>
      {percentagesArr.map((style, index) => (
        <div className={styles.guessBar}>
          <span>{index + 1}: </span>
          <div className={styles.guessPercentage} style={style}>
            {
              userInfo[`guessIn${index + 1}`] > 0 
                ? userInfo[`guessIn${index + 1}`] 
                : ''
            }
          </div>
        </div>))}
    </div>
  );

}

const PopupScore = ({ messageString, correctWord, userInfo, delaySeconds, resetBoard }: PopupScoreType) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (delaySeconds > 0) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, delaySeconds * 1000);

      return () => clearTimeout(timer); // Cleanup on unmount or re-render
    } else {
      setShowPopup(true);
    }
  }, [delaySeconds]);

  return (
    <>
      {showPopup ? (
        <div>
          <h3>{messageString}</h3>
          {correctWord !== "" ? <h5>Correct word was <span className={styles.greenWord}>{correctWord}</span></h5> : null}
          <h5>Wins: {userInfo.wins}<br />
            Losses: {userInfo.losses}<br />
            Guess Distribution: <br />
            <GuessDistribution userInfo={userInfo} />
            <button className={styles.nextWord} onClick={resetBoard}>Load Next Word</button>
          </h5>
        </div>
      ) : null}
    </>
  );
}

const PopupSimple = ({ messageString }: PopupToastType) => {
  return (
    <div>{messageString}</div>
  )
}

const Popup = ({ wordStatus, wordOfTheDay, userInfo, resetBoard }: PopupType) => {
  return (
    <div className={styles.popupContainer}>
      {wordStatus === "correct" 
        ? (<PopupScore messageString="Correct Word Guessed!" correctWord={wordOfTheDay} userInfo={userInfo} delaySeconds={5} resetBoard={resetBoard} />)
        : wordStatus === "duplicate"
          ? (<PopupSimple messageString={"Already guessed!"} />)
          : wordStatus === "invalid"
            ? (<PopupSimple messageString={"Invalid word!"} />)
            : wordStatus === "short"
              ? (<PopupSimple messageString={"Word too short!"} />)
              : wordStatus === "lost"
                ? (<PopupScore messageString={"Out of Guesses!"} correctWord={wordOfTheDay} userInfo={userInfo} delaySeconds={0} resetBoard={resetBoard} />)
                : null  
      }
    </div>
  );
}
 
export default Popup;