import React, { useState } from 'react';
import './PitchUploadPage.css';

const PitchUploadPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Producers');
  const [file, setFile] = useState(null);
  const [note, setNote] = useState('');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFile(null);
    setNote('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle backend logic later
    alert(`Pitch uploaded for ${selectedCategory}`);
  };

  return (
    <div className="pitch-upload-container">
      <h1>📤 Upload Your Pitch Deck</h1>
      <p className="subtitle">Connect with industry stakeholders by submitting your proposal</p>

      <div className="category-tabs">
        <button
          className={selectedCategory === 'Producers' ? 'active' : ''}
          onClick={() => handleCategoryChange('Producers')}
        >
          🎬 Producers
        </button>
        <button
          className={selectedCategory === 'Digital Platforms' ? 'active' : ''}
          onClick={() => handleCategoryChange('Digital Platforms')}
        >
          🌐 Digital Platforms
        </button>
      </div>

      <form className="upload-form" onSubmit={handleSubmit}>
        <label>
          Upload Pitch Deck (PDF, PPT, DOCX):
          <input
            type="file"
            accept=".pdf,.ppt,.pptx,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </label>

        <label>
          Optional Note:
          <textarea
            placeholder="Any special message for stakeholders..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>

        <button type="submit" className="submit-btn">Submit Pitch</button>
      </form>
    </div>
  );
};

export default PitchUploadPage;
