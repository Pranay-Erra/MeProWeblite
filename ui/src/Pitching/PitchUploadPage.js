import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PitchUploadPage.css';

const PitchUploadPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('Producers');
  const [file, setFile] = useState(null);
  const [note, setNote] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const navigate = useNavigate();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFile(null);
    setNote('');
    setUploadStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', selectedCategory);
    formData.append('note', note);

    try {
      const res = await fetch('https://meproweblite.onrender.com/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert(`✅ Pitch uploaded successfully! URL: ${data.url}`);
      } else {
        alert('❌ Upload failed: ' + data.error);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Upload failed');
    }
  };

  return (
    <div className="pitch-upload-container">
      {/* Home button */}
      <button className="home-btn" onClick={() => navigate('/')}>🏠 Home</button>

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

      {selectedCategory === 'Producers' && (
        <div className="download-link">
          <a
            id="producer-download"
            href="https://example.com/latest-producer-pitch.pdf"
            download
          >
            ⬇️ Download Latest Producer Pitch
          </a>
        </div>
      )}

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

      {uploadStatus && <p style={{ marginTop: '1rem' }}>{uploadStatus}</p>}
    </div>
  );
};

export default PitchUploadPage;
