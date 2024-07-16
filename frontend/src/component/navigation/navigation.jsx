import React from 'react';
import { Link } from 'react-router-dom';
import style from './styles.module.css';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Navigation() {
  const {currentUser}=useSelector(state=>state.user)
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
          <ul className={style.ul}>
          <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/home">About</Link>
            </li>
            
          {currentUser? 
         
          ( <Link to='/profile'><img className={style.profileimg} src={currentUser.photoURL} alt="profile" /></Link>):(
            <li>
              <Link to='./login'>Login</Link>
            </li>
          )}  
          </ul>
        </nav>
      </div>
    </header>
  );
}
