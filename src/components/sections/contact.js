import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import PropTypes from 'prop-types';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.75)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999,
  backdropFilter: 'blur(4px)',
};

const popupStyle = {
  background: '#0a192f',
  padding: '40px 30px',
  borderRadius: '12px',
  textAlign: 'center',
  width: '90%',
  maxWidth: '400px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
  border: '1px solid rgba(100, 255, 218, 0.2)',
  color: '#ccd6f6',
  animation: 'fadeIn 0.3s ease-out',
};


// Use a proper button for overlay click instead of div for accessibility
const ContactPopup = ({ onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const buttonBase = {
    width: '100%',
    padding: '12px 20px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    marginBottom: '15px',
    transition: 'transform 0.2s, box-shadow 0.2s',
  };

  const emailButton = {
    ...buttonBase,
    background: 'linear-gradient(90deg, #ff6a00, #ee0979)',
    color: '#fff',
  };

  const phoneButton = {
    ...buttonBase,
    background: 'linear-gradient(90deg, #00ffb8, #0096ff)',
    color: '#0a192f',
  };

  const closeButton = {
    ...buttonBase,
    background: 'transparent',
    border: '1px solid #ccd6f6',
    color: '#ccd6f6',
    marginTop: '10px',
  };

  return (
    <div style={overlayStyle} role="presentation" onClick={onClose}>
      <section
        style={popupStyle}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ marginBottom: '25px', fontSize: '1.8rem', color: '#00ffb8' }}>
          Get In Touch
        </h3>

        <a
          href="mailto:ammrwhab@gmail.com"
          style={emailButton}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          📧 Email
        </a>

        <a
          href="tel:+923038204261"
          style={phoneButton}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          📞 Phone
        </a>

        <button
          onClick={onClose}
          style={closeButton}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Close
        </button>
      </section>
    </div>
  );
};


ContactPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What’s Next?</h2>
      <h2 className="title">Get In Touch</h2>
      <p>
        I’m currently open to new opportunities and collaborations, and my inbox is always
        open. Whether you have a question, a project idea, or just want to say hi, I’ll do
        my best to get back to you.
      </p>

      <button className="email-link" onClick={() => setShowPopup(true)}>
        Say Hello
      </button>

      {showPopup && <ContactPopup onClose={() => setShowPopup(false)} />}
    </StyledContactSection>
  );
};

export default Contact;
