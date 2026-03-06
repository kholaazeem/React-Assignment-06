import React from 'react';
import { Container } from 'react-bootstrap';
import { FaBolt, FaArrowRight } from 'react-icons/fa'; // Icons import kar liye
import CustomButton from './CustomButton';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <Container className="d-flex flex-column align-items-center text-center">
        
        {/* Top Badge */}
        <div className="hero-badge slide-up-anim">
          <FaBolt className="badge-icon" />
          <span>Now Available Worldwide</span>
        </div>

        {/* Main Heading */}
        <h1 className="hero-title slide-up-anim" style={{ animationDelay: '0.1s' }}>
          Next-Generation <br />
          {/* Yahan humne apni global CSS class use ki ha! */}
          <span className="text-gradient-primary">Digital Banking</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle slide-up-anim" style={{ animationDelay: '0.2s' }}>
          Experience banking reimagined. Instant transfers, intelligent savings, 
          and enterprise-grade security — all in one beautiful platform.
        </p>

        {/* Action Buttons */}
        <div className="hero-buttons slide-up-anim" style={{ animationDelay: '0.3s' }}>
          {/* Primary Button with Icon */}
          <button className="primary-glow-btn hero-btn">
            Get Started <FaArrowRight className="ms-2" />
          </button>
          
          {/* Outline/White Button */}
          <button className="outline-btn hero-btn">
            Learn More
          </button>
        </div>

      </Container>
    </section>
  );
};

export default HeroSection;