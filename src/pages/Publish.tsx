import React, { useState } from 'react';

const Publish: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get the auth token from localStorage
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      alert('You must be logged in to publish a post');
      return;
    }

    // Prepare the data to send to the backend
    const postData = {
      title,
      content,
    
    };
    const BACKEND_URL=import.meta.env.VITE_BACKEND_URL as string;

    try {
      // Make the POST request to the backend
      const response = await fetch(`${BACKEND_URL}/api/v1/post/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${authToken}`, // Send the auth token in the header
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Post published successfully');
        setTitle(''); // Clear the form
        setContent('');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to publish the post');
    }
  };

  return (
    <div className="Publish bg-gray-100 flex items-center justify-center p-4">
      <header className="Publish-header w-full max-w-2xl bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Publish Your Post</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Tell your story..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded h-32"
          />
          <button
            type="submit"
            className="publish-btn bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Publish
          </button>
        </form>
      </header>
    </div>
  );
};

export default Publish;
