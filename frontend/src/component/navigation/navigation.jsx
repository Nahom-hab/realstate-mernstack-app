import React from 'react';
import { Link } from 'react-router-dom';
import style from './styles.module.css';
import { FaSearch } from 'react-icons/fa';

export default function Navigation() {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.logo}>
          <Link to="/">
            <span className={style.title}>
              Real<span className={style.middle}>Estate</span>Finder
            </span>
          </Link>
        </div>
        <div className={style.search}>
          <input type="text" placeholder="Search properties" />
          <button type="submit" className={style.searchButton}>
            <FaSearch />
          </button>
        </div>
        <nav className={style.nav}>
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
