import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import style from './styles.module.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
  });

  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
      const { showPassword, ...data } = formData;
      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        navigate('/login')
        if (res.ok) {
          // Signup successful
          console.log('Signup successful');
        } else {
          // Signup failed
          console.error('Signup failed');
        }
      } catch (error) {
        console.error('Error signing up:', error);
      }
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Sign Up</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        <label htmlFor="username" className={style.label}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className={style.input}
            required
          />
        </label>
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
        <label htmlFor="confirmPassword" className={style.label}>
          <div className={style.passwordContainer}>
            <input
              type={formData.showPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={style.input}
              required
            />
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
           
          </div>
         
        </label>
        <button type="submit" className={style.submitButton}>
          Sign Up
        </button>

        {passwordError && (
            <div className={style.errorMessage}>{passwordError}</div>
          )}
      </form>
      <p className={style.login}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignupPage;