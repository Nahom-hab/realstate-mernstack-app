import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { useSelector } from "react-redux"
import { getDownloadURL, getStorage,ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../../firebase'
import { errorHandeler } from '../../../../backend/utils/error'

export default function Profile() {
  const fileRef=useRef(null)
  const {currentUser} = useSelector(state => state.user)
  const [file,setFile]=useState(undefined)
  const [filePercent, setFilepercent]=useState(0)
  const [fileUploadError,setFileUploadError]=useState(false)
  const [formData,setFormData]=useState({})
  console.log(formData);
 useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
 },[file])
 const handleFileUpload=(file)=>{
        const storage=getStorage(app)
        const fileName=new Date().getTime()+file.name;
        const storageRef=ref(storage,fileName)
        const uploadTask=uploadBytesResumable(storageRef,file)

        uploadTask.on('state_changed',
          (snapshot)=>{
            const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
            setFilepercent(Math.round(progress))
          },
          (error)=>{
            setFileUploadError(true)
          }, 
          ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then(
                (downloadURL)=>{
                  setFormData({...formData,avatar:downloadURL})
                })
          }

        )
 }

  return (

    <div className={styles.container}>

      <h2 className={styles.profileHeader}>Profile</h2>
      <input onChange={(e)=>setFile(e.target.files[0])}  type="file" hidden accept='image/*'  ref={fileRef}/>
      <img onClick={()=>fileRef.current.click()} className={styles.profileImage} src={formData.avatar||currentUser.photoURL} alt="" />

      <div className={styles.message}>
          {(fileUploadError)?<p className={styles.error}>Error uploading Image</p>
          :(filePercent>0 && filePercent<100)?<p className={styles.uploading} >File uploading <span className={styles.span}>{filePercent}%</span></p>
          :(filePercent==100)?<p className={styles.succuss}>File uploaded successfully</p>:null}
      </div>
      
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
