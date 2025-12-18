import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav 
      style={{
        backgroundColor: '#333',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        color: 'white'
      }}
    >
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          MyApp
        </Link>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          Home
        </Link>
        <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>
          About
        </Link>
        <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;