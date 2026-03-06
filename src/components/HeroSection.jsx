import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPlayCircle, FaCheckCircle, FaCcMastercard, FaMicrochip } from 'react-icons/fa';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center">
          
          {/* Left Column: Text & Buttons */}
          <Col lg={6} className="hero-content mb-5 mb-lg-0">
            {/* Top Badge */}
            <div className="hero-badge slide-up">
              <span className="badge-dot"></span>
              NEW: MULTI-CURRENCY WALLETS
            </div>

            {/* Main Title */}
            <h1 className="hero-title slide-up" style={{ animationDelay: '0.1s' }}>
              The Future of <br /><span>Banking is Here</span> 
            </h1>

            {/* Subtitle */}
            <p className="hero-subtitle slide-up" style={{ animationDelay: '0.2s' }}>
              Experience the next generation of digital finance with NeoBank's secure, intuitive, and lightning-fast platform. Manage your wealth from anywhere.
            </p>

            {/* Buttons */}
            <div className="hero-buttons slide-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/register" className="btn-get-started">
                Get Started
              </Link>
              <button className="btn-watch-demo">
                <FaPlayCircle className="play-icon" /> Watch Demo
              </button>
            </div>
          </Col>

          {/* Right Column: Floating Cards Visuals */}
          <Col lg={6} className="hero-visuals slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="visuals-container">
              
              {/* Main Dark Card (NeoCard Platinum) */}
              <div className="floating-card main-dark-card float-anim-1">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <FaMicrochip className="chip-icon" />
                  <span className="card-tier">NEOCARD PLATINUM</span>
                </div>
                <div className="mb-4">
                  <p className="balance-label">Total Balance</p>
                  <h3 className="card-balance">$42,850.00</h3>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="card-number">**** **** 8824</span>
                  <FaCcMastercard className="mastercard-icon" />
                </div>
              </div>

              {/* Small Floating Card 1 (Tesla Goal) */}
              <div className="floating-card goal-card float-anim-2">
                <p className="goal-title">Tesla Goal</p>
                <div className="progress-bar-container">
                  <div className="progress-fill" style={{ width: '75%' }}></div>
                </div>
                <p className="goal-text">75% Achieved</p>
              </div>

              {/* Small Floating Card 2 (Transfer Success) */}
              <div className="floating-card transfer-card float-anim-3">
                <div className="d-flex align-items-center mb-3">
                  <div className="success-icon-bg">
                    <FaCheckCircle className="text-success" />
                  </div>
                  <div className="ms-2">
                    <p className="transfer-title">Transfer Success</p>
                    <p className="transfer-desc">Sent to Julian Rossi</p>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <h4 className="transfer-amount">$1,200.00</h4>
                  <span className="instant-badge">INSTANT</span>
                </div>
              </div>

            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;