import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
};

function PostsComponent() {
  const [keepPreviousData, setKeepPreviousData] = useState(true);
  
  
  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching,
    isRefetching,
    refetch,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ['posts', keepPreviousData],
    queryFn: fetchPosts,
    
    
    gcTime: 5 * 60 * 1000, 
    refetchOnWindowFocus: true, 
    placeholderData: keepPreviousData ? (previousData) => previousData : undefined, 
    
    
    staleTime: 10000, 
    retry: 2,
    retryDelay: 1000,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });

  
  return (
    <div>
      <h2>Posts with React Query Features</h2>
      
      <div style={{ marginBottom: '20px', padding: '10px', background: '#f0f0f0' }}>
        <h3>Active Features:</h3>
        <ul>
          <li>✅ <strong>cacheTime (gcTime):</strong> 5 minutes</li>
          <li>✅ <strong>refetchOnWindowFocus:</strong> Enabled</li>
          <li>✅ <strong>keepPreviousData (placeholderData):</strong> {keepPreviousData ? 'Enabled' : 'Disabled'}</li>
        </ul>
        <button onClick={() => setKeepPreviousData(!keepPreviousData)}>
          Toggle keepPreviousData: {keepPreviousData ? 'ON' : 'OFF'}
        </button>
      </div>

      
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {posts && (
        <div>
          <p>Showing {posts.length} posts</p>
          {posts.slice(0, 5).map(post => (
            <div key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.body.substring(0, 50)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostsComponent;
