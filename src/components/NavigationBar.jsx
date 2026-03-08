import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Bina refresh page change karne ke liye
import { FaPlaystation } from 'react-icons/fa'; // Ek dummy logo icon
import CustomButton from './CustomButton';
import './NavigationBar.css'; // Navbar ki specific CSS

const NavigationBar = () => {
  return (
    // expand="lg" ka matlab hai bari screens par pura navbar dikhe, choti (mobile) par toggle (burger) menu ban jaye
    // fixed="top" navbar ko screen ke upar chipka dega
    <Navbar expand="lg" fixed="top" className="glass-navbar">
      <Container>
        {/* Brand/Logo Section */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center fw-bold brand-text">
          <div className="logo-circle me-2">NB</div>
          NeoBank
        </Navbar.Brand>

        {/* Mobile menu toggle button */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Ye hissa mobile par hide ho jata hai aur menu mein chala jata hai */}
        <Navbar.Collapse id="basic-navbar-nav">
          
          {/* mx-auto navigation links ko center mein rakhega */}
          <Nav className="mx-auto nav-links">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
         
<Nav.Link href="/#features">Features</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
          </Nav>

          {/* Right side Buttons (Login & Open Account) */}
          <Nav className="d-flex align-items-center gap-3">
            <Nav.Link as={Link} to="/login" className="login-text fw-semibold">
              Log In
            </Nav.Link>
            {/* Yahan humne apna DRY rule wala button use kiya */}
            <CustomButton text="Open Account" className="primary-glow-btn" />
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;