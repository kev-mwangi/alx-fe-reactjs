
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <h1>My React App</h1>
          <nav>
            <Link to="/">Home</Link> | 
          <Link to="/blog">Blog</Link> | 
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <footer>
          <p>© 2024 My React App</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}


function HomePage() {
  return (
    <div>
      <h2>Welcome Home</h2>
      <p>This is the homepage of my React application.</p>
    </div>
  );
}

function AboutPage() {
  return (
    <div>
      <h2>About Us</h2>
      <p>This page tells you about our application.</p>
    </div>
  );
}



function ContactPage() {
  return (
    <div>
      <h2>Contact</h2>
      <p>Get in touch with us.</p>
    </div>
  );
}

export default App;