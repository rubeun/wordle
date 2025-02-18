import styles from './Header.module.css';

const Header = () => {
  return ( 
    <header className={`${styles.header} ${styles.glowHeader}`}>
      <h1>Rubeun's Wordle</h1>
    </header>
);
}

export default Header;