import React from 'react'
import { Link } from 'react-router-dom'
import style from './styles.module.css'

export default function Navigation() {
  return (
    <div className={style.navigation}>
        <Link to='/'>
            <nav className={style.nav}>companame</nav>
        </Link>
        <nav>search</nav>
        <nav className={style.slides}>
            <Link to='/profile'><nav>profile</nav></Link>
            <Link to='/signup'><nav>signup</nav></Link>
        </nav>
    </div>
  )
}
