import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/generate-image', { prompt });
      const imageUrl = response.data.image_url;
      // handle the response and display the generated image
      setImageUrl(imageUrl);
      setError('');
    } catch (error) {
      // handle the error
      setError('Error generating image');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Concept Art Generator</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="search-input"
          placeholder="Enter a prompt"
        />
        <button type="submit" className="submit-button">Generate Image</button>
      </form>
      {imageUrl && (
        <div className="image-container">
          <img src={imageUrl} alt="Generated Concept Art" className="generated-image" />
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;
