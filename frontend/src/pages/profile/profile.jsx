import React from 'react'
import styles from './styles.module.css'
import { useSelector } from "react-redux"
import { signInFailure,signInSuccess,signInStart } from '../../redux/user/userSlice'

export default function Profile() {
  const {currentUser} = useSelector(state => state.user)

  // const getuser=async ()=>{
  //   try {
  //     const res = await fetch('/api/user/getuser', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     if (!res.ok) {
  //       const { error } = await res.json();
  //       dispatch(signInFailure(error.message));
  //       return;
  //     }

  //     const myuser = await res.json();
  //     console.log(myuser);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // getuser()
  return (

    <div className={styles.container}>

      <h2 className={styles.profileHeader}>Profile</h2>

      <img className={styles.profileImage} src={currentUser.photoURL} alt="" />

      <form className={styles.formContainer}>

        <input className={styles.formInput} type="text" placeholder='Username'/>

        <input className={styles.formInput} type="text" placeholder='Email'/>

        <input className={styles.formInput} type="text" placeholder='bio'/>

        <button className={styles.updateButton}>UPDATE</button>

        <button className={styles.updateButton}>CREATE LISTING</button>

      </form>

     

      <div className={styles.delete}>

        <p className={styles.deleteAccount}>delete account</p>

        <p className={styles.deleteAccount}>Sign out</p>

      </div>
      
    </div>

  );
}
