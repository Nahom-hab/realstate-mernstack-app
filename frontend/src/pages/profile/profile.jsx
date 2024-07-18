import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase';
import { deleteStart, deleteSuccess, deleteFailure, signoutStart, signoutFailure, signoutSuccess } from '../../redux/user/userSlice';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [userdata, setUserdata] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  useEffect(() => {
    if (currentUser?.email) {
      getUser();
    }
  }, [currentUser]);

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/getuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: currentUser.email }),
      });
      const data = await res.json();
      setUserdata(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch user data', error);
      setLoading(false);
    }
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercent(Math.round(progress));
      },
      (error) => {
        console.error('Error uploading file', error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
          setFilePercent(0); // Reset the progress after completion
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('Updating...');
    try {
      const res = await fetch(`/api/user/update/${userdata._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const updatedUser = await res.json();
        setUserdata(updatedUser);
        setSubmitStatus('Profile updated successfully!');
      } else {
        setSubmitStatus('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile', error);
      setSubmitStatus('Error updating profile.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        dispatch(deleteStart())
        const res = await fetch(`/api/user/delete/${userdata._id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          const data = await res.json();
          dispatch(deleteSuccess(data));
        } else {
          const errorData = await res.json();
          dispatch(deleteFailure(errorData.message));
 
        }
      } catch (error) {
        console.error('Error deleting account', error);
        dispatch(deleteFailure(error.message));
      }
    }
  };
  
  const handleSignout=async()=>{
    try {
      dispatch(signoutStart())
      const res=await fetch('/api/auth/signout')
      const data= await res.json()
      if(!res.ok){
        dispatch(signoutFailure(data.message))
        return
      }
      dispatch(signoutSuccess(data))
      
    } catch (error) {
      dispatch(signoutFailure(error.message))
      
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.profileHeader}>Profile</h2>
      <input
        onChange={handleFileChange}
        type="file"
        hidden
        accept="image/*"
        ref={fileRef}
      />
      <img
        onClick={() => fileRef.current.click()}
        className={styles.profileImage}
        src={formData.avatar || currentUser.photoURL}
        alt="Profile"
      />
      <div className={styles.message}>
        {fileUploadError && <p className={styles.error}>Error uploading image</p>}
        {filePercent > 0 && filePercent < 100 && (
          <p className={styles.uploading}>
            File uploading <span className={styles.span}>{filePercent}%</span>
          </p>
        )}
        {filePercent === 100 && <p className={styles.success}>File uploaded successfully</p>}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            className={styles.formInput}
            type="text"
            placeholder="Username"
            name="username"
            defaultValue={userdata.username}
          />
          <input
            onChange={handleChange}
            className={styles.formInput}
            type="text"
            placeholder="Email"
            name="email"
            defaultValue={userdata.email}
          />
          <input
            onChange={handleChange}
            className={styles.formInput}
            type="password"
            placeholder="Password"
            name="password"
          />
          <button className={styles.updateButton} type="submit">
            UPDATE
          </button>
          <button className={styles.updateButton} type="button">
            CREATE LISTING
          </button>
        </form>
      )}
      {submitStatus && <p className={styles.submissionstatus}>{submitStatus}</p>}
      <div className={styles.delete}>
        <p onClick={handleDelete} className={styles.deleteAccount}>Delete account</p>
        <p onClick={handleSignout} className={styles.deleteAccount}>Sign out</p>
      </div>
    </div>
  );
}
