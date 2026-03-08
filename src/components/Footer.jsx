import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa'; // Connect icons ke liye
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <Container>
        {/* mb-5 means margin-bottom: 3rem, gy-4 means row mein gap */}
        <Row className="gy-4 mb-5">
          
          {/* Column 1: Brand Info */}
          <Col lg={4} md={6} sm={12}>
            <div className="footer-brand mb-3">
              <div className="footer-logo-circle me-2">NB</div>
              <span className="footer-brand-text">NeoBank</span>
            </div>
            <p className="footer-desc">
              Next-generation digital banking for the modern world.
            </p>
          </Col>

          {/* Column 2: Product Links */}
          <Col lg={2} md={6} sm={12}>
            <h5 className="footer-heading">Product</h5>
            <ul className="footer-links">
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </Col>

          {/* Column 3: Legal Links */}
          <Col lg={3} md={6} sm={12}>
            <h5 className="footer-heading">Legal</h5>
            <ul className="footer-links">
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </Col>

          {/* Column 4: Connect / Social */}
          <Col lg={3} md={6} sm={12}>
            <h5 className="footer-heading">Connect</h5>
            <div className="social-icons">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon">
                <FaLinkedinIn />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon">
                <FaGithub />
              </a>
            </div>
          </Col>

        </Row>

        {/* Divider Line */}
        <div className="footer-divider"></div>

        {/* Copyright Text */}
        <div className="footer-bottom">
          <p>© 2026 NeoBank. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;