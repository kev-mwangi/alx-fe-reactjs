// src/components/PostsComponent.jsx
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import './PostsComponent.css'; // Optional for styling

// Navigation component to simulate page changes
import { Link, Routes, Route, useLocation } from 'react-router-dom';

// API service function
const fetchPosts = async () => {
  console.log('🔵 API Call: Fetching posts from server...');
  // Add delay to see loading states clearly
  await new Promise(resolve => setTimeout(resolve, 1000));
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  const data = await response.json();
  console.log('✅ API Call: Received', data.length, 'posts');
  return data;
};

function PostsComponent() {
  const location = useLocation();
  const [forceRefetchCount, setForceRefetchCount] = useState(0);
  
  // Use the useQuery hook to fetch posts
  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    dataUpdatedAt,
    isStale,
    isFetched,
    isSuccess,
  } = useQuery({
    queryKey: ['posts', forceRefetchCount], // forceRefetchCount changes cache key
    queryFn: fetchPosts,
    staleTime: 10000, // 10 seconds - data becomes stale after this
    gcTime: 30000, // 30 seconds - garbage collection time (cache time)
    retry: 1,
  });

  // Function to manually invalidate and refetch
  const handleForceRefetch = () => {
    console.log('🔄 Manual refetch triggered');
    setForceRefetchCount(prev => prev + 1); // Change query key to force refetch
  };

  // Function to refetch without changing cache key
  const handleSoftRefetch = async () => {
    console.log('🔄 Soft refetch triggered');
    await refetch();
  };

  // Function to clear cache (simulate)
  const handleClearCache = () => {
    // In a real app, you'd use queryClient.invalidateQueries()
    console.log('🗑️ Cache clear requested (simulated)');
    // For demo, we'll just force a refetch
    handleForceRefetch();
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return 'Never';
    return new Date(timestamp).toLocaleTimeString();
  };

  // Calculate time since last update
  const getTimeSinceUpdate = () => {
    if (!dataUpdatedAt) return 'Never';
    const seconds = Math.floor((Date.now() - dataUpdatedAt) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    return `${Math.floor(seconds / 60)} minutes ago`;
  };

  return (
    <div className="posts-container">
      <div className="demo-header">
        <h2>React Query Caching Demo</h2>
        <p className="demo-subtitle">Observe how React Query handles caching when navigating away and back</p>
        
        {/* Cache Status Display */}
        <div className="cache-status">
          <div className="status-item">
            <span className="status-label">Cache Status:</span>
            <span className={`status-indicator ${isStale ? 'stale' : 'fresh'}`}>
              {isStale ? 'Stale' : 'Fresh'}
            </span>
          </div>
          <div className="status-item">
            <span className="status-label">Last Updated:</span>
            <span className="status-value">{getTimeSinceUpdate()}</span>
          </div>
          <div className="status-item">
            <span className="status-label">Data Loaded:</span>
            <span className={`status-indicator ${isSuccess ? 'success' : 'pending'}`}>
              {isSuccess ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="status-item">
            <span className="status-label">Is Fetching:</span>
            <span className={`status-indicator ${isFetching ? 'fetching' : 'idle'}`}>
              {isFetching ? 'Yes' : 'No'}
            </span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="control-buttons">
          <button 
            onClick={handleSoftRefetch} 
            disabled={isFetching}
            className="btn btn-primary"
            title="Refetch data if stale or on manual trigger"
          >
            {isFetching ? 'Refetching...' : 'Soft Refetch'}
          </button>
          
          <button 
            onClick={handleForceRefetch} 
            disabled={isFetching}
            className="btn btn-secondary"
            title="Force refetch from server (bypass cache)"
          >
            Force Refetch
          </button>
          
          <button 
            onClick={handleClearCache}
            className="btn btn-danger"
            title="Simulate cache invalidation"
          >
            Clear Cache
          </button>
          
          <div className="navigation-hint">
            <p>💡 <strong>Demo Instructions:</strong></p>
            <ol>
              <li>Click "Go to Home" to navigate away</li>
              <li>Wait a few seconds (observe cache status)</li>
              <li>Click "Back to Posts" - data loads instantly from cache!</li>
              <li>Use buttons above to control caching behavior</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Posts Content */}
      <div className="posts-content">
        {isLoading && !posts && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>⏳ Loading posts from server... (This shows on first load or cache miss)</p>
            <p className="loading-note">Check browser console for API call logs</p>
          </div>
        )}

        {isFetching && posts && (
          <div className="refetching-notice">
            <p>🔄 Background refetch in progress... Data from cache is shown below</p>
          </div>
        )}

        {isError && (
          <div className="error-container">
            <p className="error-message">❌ Error: {error.message}</p>
            <button onClick={handleForceRefetch} className="btn btn-primary">
              Retry
            </button>
          </div>
        )}

        {posts && (
          <>
            <div className="posts-header">
              <h3>📝 Posts ({posts.length} total)</h3>
              <p className="cache-note">
                {!isFetching && !isLoading 
                  ? '✅ Data loaded from cache - no loading spinner!' 
                  : '🔄 Fetching fresh data...'}
              </p>
            </div>

            <div className="posts-grid">
              {posts.slice(0, 6).map((post) => (
                <div key={post.id} className="post-card">
                  <h4 className="post-title">{post.title}</h4>
                  <p className="post-body">{post.body.substring(0, 100)}...</p>
                  <div className="post-meta">
                    <span>Post #{post.id}</span>
                    <span>User {post.userId}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="posts-footer">
              <p>
                <strong>Cache Demonstration:</strong> 
                {isFetching 
                  ? ' Currently fetching fresh data...' 
                  : ' Data is served from cache. Try navigating away and back!'}
              </p>
              <p className="timestamp">
                Last updated: {formatTime(dataUpdatedAt)}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Home Component for navigation demo
function HomePage() {
  return (
    <div className="home-container">
      <h2>🏠 Home Page</h2>
      <p>You've navigated away from the Posts component.</p>
      <p>Wait 10+ seconds for data to become stale, then return to see caching in action!</p>
      <div className="cache-info">
        <h4>What to observe:</h4>
        <ul>
          <li>If you return within 10 seconds → Instant load from cache</li>
          <li>If you return after 10 seconds → Background refetch (stale data shown first)</li>
          <li>If you return after 30 seconds → Full reload (cache garbage collected)</li>
        </ul>
      </div>
      <Link to="/posts" className="btn btn-primary">
        ← Back to Posts
      </Link>
    </div>
  );
}


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/posts" element={<PostsComponent />} />
    </Routes>
  );
}


export function AppWithNavigation() {
  return (
    <div>
      <nav className="app-nav">
        <Link to="/" className="nav-link"> Go to Home</Link>
        <Link to="/posts" className="nav-link">Back to Posts</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostsComponent />} />
      </Routes>
    </div>
  );
}