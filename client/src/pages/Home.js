import React from 'react';
import { Link } from 'react-router-dom';
import inspiration from "../assets/images/inspiration.jpeg";
import countdown from "../assets/images/countdown.jpeg";
import venue from "../assets/images/venue.jpeg";
import budget from "../assets/images/budget.jpeg";
import vendors from "../assets/images/vendors.jpeg";

const Home = () => {
  return (
    <>
      <div className="hero">
        <h1 className="text-gradient logo">Wedding Whispers</h1>
        <h2 className="text-gradient sublogo">Where Every Love Story Finds Its Perfect Symphony.</h2>
        <img src="robot.png" width="200px" alt="Robot wearing a veil"></img>
        <p className="text-gradient description">&ldquo;Embark on a journey of love and inspiration with Wedding Whispers. Our curated Creative Showcase page is a canvas of unique ideas, bringing your dream wedding to life with a touch of innovation and artistic flair. Explore the extraordinary and let your love story unfold in the most enchanting way possible.&rdquo;</p>
      </div>
      <div className="flex-container">
        <div className="homepage-card">
          <Link to="/budget" className="navigation-link">
            <img src={budget} alt="Wedding Budget" />
            <div className="overlay">
              <div className="overlay-text">
              Craft Your Wedding Financial Blueprint
              </div>
            </div>
          </Link>
        </div>
        <div className="homepage-card">
          <Link to="/countdown" className="navigation-link">
            <img src={countdown} alt="Wedding Countdown" />
            <div className="overlay">
              <div className="overlay-text">
              Timeless Ticks to Your Special Moment!
              </div>
            </div>
          </Link>
        </div>
        <div className="homepage-card">
          <a href="/inspiration">
            <img src={inspiration} alt="Inspiration" />
            <div className="overlay">
              <div className="overlay-text">
              Explore Endless Ideas!
              </div>
            </div>
          </a>
        </div>
        <div className="homepage-card">
          <Link to="/vendors" className="navigation-link">
            <img src={vendors} alt="Search Vendors" />
            <div className="overlay">
              <div className="overlay-text">
              Discover Top-notch Vendors for Your Perfect Celebration!
              </div>
            </div>
          </Link>
        </div>
        <div className="homepage-card">
          <Link to="/venues" className="navigation-link">
            <img src={venue} alt="Search Venues" />
            <div className="overlay">
              <div className="overlay-text">
                Search for Venues
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;