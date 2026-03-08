import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Button click par naye page pe le jane k liye
import './CtaSection.css';

const CtaSection = () => {
  return (
    <section className="cta-section">
      <Container>
        <div className="cta-wrapper slide-up">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-subtitle">
            Join thousands of users who trust NeoBank for their <br className="d-none d-md-block" />
            everyday finances.
          </p>
          <Link to="/register" className="cta-btn">
            Create Free Account
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default CtaSection;