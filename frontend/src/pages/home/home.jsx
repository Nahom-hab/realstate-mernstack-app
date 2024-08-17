import React from 'react'
import style from './styles.module.css'
import landing2 from '../../assets/images/landing2.jpg'


export default function Home() {
  return (
    <div>
      {/* <div className={style.title}> */}
      {/* <span className={style.heding}> Finding RealEstate </span>
        <span className={style.easy}> made <span className={style.text}>EASY</span>  for you</span> */}
      {/* </div> */}
      <img src={landing2} className={style.img} alt="" />
    </div>
  )
}
