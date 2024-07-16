import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { showPassword, ...data } = formData;

    dispatch(signInStart());

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const { error } = await res.json();
        dispatch(signInFailure(error.message));
        return;
      }

      const result = await res.json();
      dispatch(signInSuccess(result)); // Assuming result contains user data or token
      navigate('/');
    } catch (err) {
      dispatch(signInFailure(err.message));
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Login</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        <label htmlFor="email" className={style.label}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className={style.input}
            required
          />
        </label>
        <label htmlFor="password" className={style.label}>
          <div className={style.passwordContainer}>
            <input
              type={formData.showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className={style.input}
              required
            />
          </div>
        </label>
        <div className={style.showpass}>
          <label htmlFor="showPassword" className={style.showPassword}>
            <input
              type="checkbox"
              id="showPassword"
              name="showPassword"
              checked={formData.showPassword}
              onChange={handleInputChange}
            />
            Show Password
          </label>
        </div>
        <button type="submit" className={style.submitButton}>
          Login
        </button>
        {error && <p className={style.error}>{error}</p>}
      </form>
      <p className={style.login}>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
