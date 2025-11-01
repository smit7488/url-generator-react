import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaDownload, FaEnvelope, FaBars } from 'react-icons/fa';

// Simplified SVG placeholder for the Henry Schein logo
const HenryScheinLogo = () => (
  <svg viewBox="0 0 100 100" height="40" width="40" xmlns="http://www.w3.org/2000/svg" className="me-2 rounded-lg bg-blue-600 p-1">
    <rect x="10" y="10" width="80" height="80" fill="#fff" />
    <text x="50" y="65" fontSize="50" textAnchor="middle" fill="#0c4a6e" fontWeight="bold">HS</text>
  </svg>
);

const Navigation = () => {
  // Styles for the Nav.Link when it's an icon
  const iconLinkClasses = "p-0 text-gray-700 hover:text-blue-600 transition-colors";

  return (
    // 1. Navbar component replaces the <nav> tag.
    // bg-white and shadow-lg from Tailwind for aesthetics.
    // sticky="top" makes it a sticky header.
    <Navbar expand="lg" className="bg-white shadow-lg custom-nav border-bottom" sticky="top">
      <Container>
        {/* 2. Navbar Brand (Logo and Tool Name) */}
        <Navbar.Brand href="/" className="d-flex align-items-center me-lg-4">
          <HenryScheinLogo />
          <span className="fw-bold text-lg text-gray-800">
            URL Generator
          </span>
        </Navbar.Brand>

        {/* 3. Toggler for mobile view */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0">
            {/* Switched to FaBars icon */}
            <FaBars className="text-gray-700" size={24} />
        </Navbar.Toggle>

        {/* 4. Collapsible Content */}
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Main Links - Centered */}
          {/* Using custom flexbox classes to center the links */}
          <Nav className="mx-auto text-center nav-inner flex-grow-1 justify-content-lg-center">
            <Nav.Link href="/#web" className="nav-anchors mx-3 fw-semibold">Web</Nav.Link>
            <Nav.Link href="/#creative" className="nav-anchors mx-3 fw-semibold">Creative</Nav.Link>
          </Nav>

          {/* Right-Side Icons/Links */}
          <Nav className="nav-bottom d-flex gap-4 align-items-center my-2 my-lg-0 flex-row justify-content-center">
            
        
          

    

            {/* Contact Icon Link - Switched to FaEnvelope */}
            <Nav.Link href="/contact" title="Contact Me!" className={iconLinkClasses}>
              <FaEnvelope size={24} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
