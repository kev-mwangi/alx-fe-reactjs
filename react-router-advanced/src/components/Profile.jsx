import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

function Profile() {
  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      
      <nav className="profile-nav">
        <Link to="/profile" end className="profile-link">
          Overview
        </Link>
        <Link to="/profile/details" className="profile-link">
          Details
        </Link>
        <Link to="/profile/settings" className="profile-link">
          Settings
        </Link>
      </nav>
      
      <div className="profile-content">
        <Routes>
          <Route path="/" element={<ProfileOverview />} />
          <Route path="/details" element={<ProfileDetails />} />
          <Route path="/settings" element={<ProfileSettings />} />
        </Routes>
      </div>
    </div>
  );
}


function ProfileOverview() {
  return (
    <div className="profile-overview">
      <h2>Profile Overview</h2>
      <p>Welcome to your profile dashboard.</p>
      <div className="stats">
        <div className="stat-item">
          <h3>Account Status</h3>
          <p>Active</p>
        </div>
        <div className="stat-item">
          <h3>Member Since</h3>
          <p>January 2023</p>
        </div>
        <div className="stat-item">
          <h3>Last Login</h3>
          <p>Today</p>
        </div>
      </div>
    </div>
  );
}

function ProfileDetails() {
  return (
    <div className="profile-details">
      <h2>Profile Details</h2>
      <form className="details-form">
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" defaultValue="John Doe" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" defaultValue="john@example.com" />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" defaultValue="+1 (555) 123-4567" />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" defaultValue="New York, USA" />
        </div>
        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div className="profile-settings">
      <h2>Profile Settings</h2>
      <div className="settings-section">
        <h3>Privacy Settings</h3>
        <div className="setting-item">
          <label>
            <input type="checkbox" defaultChecked />
            Show profile to other users
          </label>
        </div>
        <div className="setting-item">
          <label>
            <input type="checkbox" />
            Allow email notifications
          </label>
        </div>
      </div>
      
      <div className="settings-section">
        <h3>Account Preferences</h3>
        <div className="setting-item">
          <label>Theme</label>
          <select defaultValue="light">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
        <div className="setting-item">
          <label>Language</label>
          <select defaultValue="en">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>
      
      <div className="danger-zone">
        <h3>Danger Zone</h3>
        <button className="danger-button">
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default Profile;