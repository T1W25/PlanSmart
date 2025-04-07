import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from '../components/Navbar';

const Contact = () => {
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      e.target,
      'YOUR_PUBLIC_KEY'
    )
    .then(() => {
      setSuccessMsg('Message sent successfully! ✅');
      setTimeout(() => setSuccessMsg(''), 4000);
    }, (error) => {
      console.error(error.text);
      setSuccessMsg('Something went wrong. Please try again. ❌');
      setTimeout(() => setSuccessMsg(''), 4000);
    });

    e.target.reset();
  };

  return (
    <div style={styles.pageContainer}>
      <Navbar />
      
      <style>
        {`
          @media (max-width: 768px) {
            .content-container {
              flex-direction: column;
              padding: 20px;
            }
            .left-side, .right-side {
              width: 100%;
            }
          }
          .fade {
            opacity: 1;
            transition: opacity 0.5s ease-in-out;
          }
        `}
      </style>

      <div className="content-container" style={styles.contentContainer}>
        <div className="left-side" style={styles.leftSide}>
          <h1 style={styles.header}>Customer Support</h1>
          <p style={styles.text}>
            If you have any questions, feedback, or need help—feel free to reach out!
          </p>
        </div>

        <div className="right-side" style={styles.rightSide}>
          <h2 style={styles.formHeader}>Get in Touch</h2>

          {successMsg && (
            <div className="fade" style={styles.successMsg}>
              {successMsg}
            </div>
          )}

          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label htmlFor="personal" style={styles.label}>Personal/Organization</label>
              <input type="text" id="personal" name="personal" placeholder="Your name or organization" style={styles.input} required />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="subject" style={styles.label}>Subject</label>
              <input type="text" id="subject" name="subject" placeholder="Subject" style={styles.input} required />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="feedback" style={styles.label}>Feedback</label>
              <textarea id="feedback" name="feedback" placeholder="Your message..." rows="5" style={styles.textarea} required />
            </div>

            <button type="submit" style={styles.submitButton}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundImage: 'url("/images/contactus.gif")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    paddingTop: '80px',
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '40px',
    flexWrap: 'wrap',
  },
  leftSide: {
    flex: 1,
    padding: '20px',
  },
  header: {
    fontSize: '2rem',
    textAlign: 'left',
    marginBottom: '20px',
  },
  text: {
    fontSize: '1rem',
    marginTop: '10px',
  },
  rightSide: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  },
  formHeader: {
    fontSize: '1.5rem',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '1rem',
    marginBottom: '5px',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    alignSelf: 'flex-end',
    marginTop: '20px',
  },
  successMsg: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '15px',
    fontSize: '0.95rem',
  },
};

export default Contact;
