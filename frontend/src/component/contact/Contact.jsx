import React, { useState } from 'react';
import style from './style.module.css';

export default function Contact({ listing }) {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const sendEmailGmail = () => {
    const email = listing.email;
    const subject = listing.name;
    const body = encodeURIComponent(message);
    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
  };

  return (
    <div className={style.contact}>
      <div>
        Contact <span>{listing.username}</span> for the listing <span>{listing.name}</span>
      </div>
      <textarea
        placeholder='Enter your message here...'
        onChange={handleChange}
        className={style.textarea}
        value={message}
        rows='2'
      />
      <button onClick={sendEmailGmail} className={style.btn}>Send Message</button>
    </div>
  );
}
