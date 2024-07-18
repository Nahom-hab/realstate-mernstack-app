import style from './styles.module.css';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../../redux/user/userSlice';

export default function Oauth() {
    const dispatch=useDispatch();
    const navigate=useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
     
     
      const res=await fetch ('/api/auth/google',{
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          username:result.user.displayName,
          email:result.user.email,
          photo:result.user.photoURL 
        })
      })
      dispatch(signInSuccess(result.user))
      navigate('/')
    } catch (error) {
        console.error('Error during Google Sign-In:', error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className={style.oauthButton}
    >
      CONTINUE WITH GOOGLE
    </button>
  );
}
