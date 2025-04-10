import React from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

const segments = [
  {
    title: 'Profiling',
    description: 'Create professional profiles showcasing subject-matter expertise.',
    features: ['Standard & Premium features', 'Portfolio Builder', 'Visibility Tools'],
  },
  {
    title: 'Learning & Certification',
    description: 'Access courses, upskill and get certified in new domains.',
    features: ['Paid Programs', 'Track Progress', 'Category-wise Learning'],
  },
  {
    title: 'Sourcing',
    description: 'Find talent, equipment, and locations for production needs.',
    features: ['Talent Pool', 'Equipment Rental', 'Indoor/Outdoor Locations'],
  },
  {
    title: 'Funding',
    description: 'Connect with investors, producers for project funding.',
    features: ['Investor Listings', 'Submit Projects', 'Chat with Backers'],
  },
  {
    title: 'Pitching',
    description: 'Upload proposals and connect with producers and marketers.',
    features: ['Pitch Templates', 'OTT & Theatre Connections', 'Submit Decks'],
  },
  {
    title: 'Screening Stories',
    description: 'Get feedback from writers & AI tools on story viability.',
    features: ['AI ROI Analysis', 'Writer Panel Feedback', 'Genre Targeting'],
  },
];

const LandingPage = () => {
  const nav=useNavigate();
  const handleClick=()=>{
    nav('/login');
  }
  return (
    <div className="landing-container">
      <header className="hero">
        <div className="logo-container">
          <div className="logo-left">
            <img src="/p3.jpg" alt="Cinepreneur Logo" className="cinepreneur-logo" />
          </div>
          <div className="logo-right">
            <img src="/p1.jpg" alt="MeeSchool Logo" className="meeschool-logo" />
          </div>
        </div>
        <h1>🎬 Media & Entertainment Marketplace</h1>
        <p>Empowering Creators, Professionals, and Innovators</p>
        <div className="hero-buttons">
          <button onClick={() => handleClick()}>Login to Get Started</button>
          <button className="outline">Explore Segments</button>
        </div>
      </header>

      <section className="segments">
        {segments.map((segment, index) => {
          const isPitching = segment.title === 'Pitching';

          const handleDoubleClick = () => {
            if (isPitching) {
              window.location.href = '/pitch-upload'; // Change this route if using React Router
            }
          };

          return (
            <div
              key={index}
              className="segment-card"
              {...(isPitching ? { onClick: handleDoubleClick } : {})}
            >
              <h2>{segment.title}</h2>
              <p>{segment.description}</p>
              <ul>
                {segment.features.map((item, i) => (
                  <li key={i}>✔️ {item}</li>
                ))}
              </ul>
              <button className="deep-dive">Explore More</button>
            </div>
          );
        })}
      </section>

      <footer className="footer">
        <p>© 2025 MediaVerse. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
