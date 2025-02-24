import styles from './Header.module.css';
import { IconMoon, IconSunFilled } from '@tabler/icons-react';

type HeaderType = {
  isDarkMode: boolean,
  toggleDarkMode: any,
}

const Header = ({ isDarkMode, toggleDarkMode}: HeaderType) => {
  return ( 
    <header className={`${styles.header} `}>
      <h1 className={styles.glowHeader}>Rubeun's Wordle</h1>
      <div className={styles.darkModeIcon}>
        {isDarkMode ? <IconSunFilled onClick={toggleDarkMode} /> : <IconMoon onClick={toggleDarkMode} />}
      </div>
    </header>
);
}

export default Header;