import Link from "next/link";
import css from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import ThemeSwitcher from "../ThemeProvider/ThemeSwitcher";

const HomeIcon = (
  <svg className={css.navigationIcon} viewBox="0 0 20 20" fill="none"><path d="M3 9.5L10 4l7 5.5V16a2 2 0 01-2 2H5a2 2 0 01-2-2V9.5z" stroke="#fff" strokeWidth="1.5" fill="none"/></svg>
);
const NotesIcon = (
  <svg className={css.navigationIcon} viewBox="0 0 20 20" fill="none"><rect x="4" y="6" width="12" height="2.5" rx="1.2" fill="#a084f7"/><rect x="4" y="11" width="8" height="2.5" rx="1.2" fill="#ff6bcb"/></svg>
);
const LogoIcon = (
  <svg className={css.headerLogoIcon} viewBox="0 0 32 32" fill="none"><rect x="6" y="8" width="20" height="16" rx="5" fill="#fff"/><rect x="10" y="12" width="12" height="8" rx="2" fill="#a084f7"/><rect x="14" y="16" width="4" height="2" rx="1" fill="#ff6bcb"/></svg>
);

const Header = () => (
  <header className={css.header}>
    <div className={css.headerLogo} aria-label="NoteHub logo">
      {LogoIcon}
      NoteHub
    </div>
    <nav aria-label="Main Navigation">
      <ul className={css.navigation}>
        <li className={css.navigationItem}>
          <Link href="/" className={css.navigationLink}>
            {HomeIcon}
            Home
          </Link>
        </li>
        <li className={css.navigationItem}>
          <Link href="/notes/filter/All" className={css.navigationLink}>
            {NotesIcon}
            Notes
          </Link>
        </li>
        <AuthNavigation />
        <li className={css.navigationItem}>
          <ThemeSwitcher />
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
