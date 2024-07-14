import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './styles.module.css'


export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    showPassword: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Login</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        <label htmlFor="username" className={style.label}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder='Username'
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
            placeholder='Email'
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
              placeholder='Password'
              value={formData.password}
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
          Login
        </button>
      </form>
      <p className={style.login}>
        Already have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};
