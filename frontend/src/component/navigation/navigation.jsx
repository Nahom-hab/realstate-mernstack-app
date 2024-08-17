import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './styles.module.css';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export default function Navigation() {
  const { currentUser } = useSelector(state => state.user)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()


  const handleSearch = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams()
    urlParams.set('searchTerm', searchTerm) // Set searchTerm in query params
    navigate(`/search?${urlParams.toString()}`) // Navigate with the search query
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }

  }, [location.search])

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
        <form onSubmit={handleSearch}>
          <div className={style.search}>
            <input
              type="text"
              placeholder="Search properties"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value) }}
            />
            <button type="submit" className={style.searchButton}>
              <FaSearch />
            </button>
          </div>
        </form>

        <nav className={style.nav}>
          <div className={style.hamburgeur}>
            <div className={style.line}></div>
            <div className={style.line}></div>
            <div className={style.line}></div>
          </div>
          <ul className={style.ul}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            {currentUser ? (
              <li>
                <Link to="/mylisting">My Listing</Link>
              </li>) : ''
            }


            {currentUser ?

              (
                <li><Link to='/profile'><img className={style.profileimg} src={currentUser.photoURL} alt="profile" /></Link></li>) : (
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
