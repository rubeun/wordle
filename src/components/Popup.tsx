import styles from './Popup.module.css';

type PopupType = {
  wordStatus: string;
}

const Popup = ({ wordStatus }: PopupType) => {
  return (
    <div className={styles.popupContainer}>
      {wordStatus === "correct" 
        ? (<div><h3>Correct Word Guessed!</h3></div>)
        : wordStatus === "duplicate"
          ? (<div>Already guessed</div>)
          : wordStatus === "invalid"
            ? (<div>Invalid Word!</div>)
            : wordStatus === "short"
              ? (<div>Word too short!</div>)
              : null
      }
    </div>
  );
}
 
export default Popup;