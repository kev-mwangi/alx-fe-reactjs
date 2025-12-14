
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import ProtectedRoute from './components/ProtectedRoute';

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
            <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer>
          <p>© 2024 My React App</p>
        </footer>
      </div>
      <ProtectedRoute>
            <Profile />

          </ProtectedRoute>
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
function BlogPost() {
  return (
    <div>
      <h1>Blog Post Details</h1>
      <p>This is a detailed blog post view.</p>
    </div>
  );
}

function BlogList() {
  return (
    <div>
      <h1>Blog List</h1>
      <p>This is a list of blog posts.</p>
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

function Login() {
  const handleLogin = () => {
    
    localStorage.setItem('isAuthenticated', 'true');
    window.location.href = '/profile';
  };
  
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Click to Login</button>
      <p>After login, you'll be redirected to /profile</p>
    </div>
  );
}
function Login() {
  const handleLogin = () => {
    
    localStorage.setItem('isAuthenticated', 'true');
    window.location.href = '/profile';
  };
  
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Click to Login</button>
      <p>After login, you'll be redirected to /profile</p>
    </div>
  );
}


export default App;