import React from 'react';
import { Navbar, Container, Nav, Offcanvas, Row, Col } from 'react-bootstrap';
import { FaGoogle, FaBars } from 'react-icons/fa'; 
import urlIcon from '../assets/icon.svg'

 
// Simplified SVG placeholder for the Henry Schein logo
const HenryScheinLogo = () => (
  <img 
    src= {urlIcon}
    alt="Henry Schein" 
    height="30" 
    className="d-inline-block align-top me-2"
    // Fallback/Styling to mimic the logo from the original context
    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x30/00406d/ffffff?text=HS+Logo"; }}
  />
);

const Navigation = () => {
  // Using 'md' as the breakpoint for the collapse
  const expandBreakpoint = 'md';

  return (
    <Navbar 
      expand={expandBreakpoint} 
      className="shadow-lg bg-white border-bottom" 
      sticky="top"
      data-bs-theme="light"
    >
      {/* Use Row/Col inside Container to explicitly define the grid columns */}
      <Container fluid className="nav-inner py-2 px-3">
        <Row className="w-100 align-items-center g-0">
          
          {/* Col 1: Logo and Title (Left Column, takes 6/12 on mobile, 3/12 on desktop) */}
          <Col xs={6} lg={3} className="d-flex align-items-center">
            <div className="logo-wrapper d-flex align-items-center me-3">
                {/* Navbar.Brand wraps the logo for correct functionality/a11y in Navbar context */}
                <Navbar.Brand href="/" className="d-flex align-items-center logo p-0">
                    <HenryScheinLogo /><h1 className="logo-text fw-bold text-lg text-gray-800 m-0">
                    URL-GENius
                </h1>
                </Navbar.Brand>
                {/* Tool Name */}
                
            </div>
          </Col>
          
          {/* Col 2: Headline / Subtitle (Center Column - Desktop Only, takes 6/12) */}
          <Col lg={6} className="d-none d-lg-flex justify-content-center">
              <p className="nav-headline text-sm text-muted m-0">
                  A GA4-Tagged URL Generator
              </p>
          </Col>
          
          {/* Col 3: Desktop Help Link and Toggler (Right Column, takes 6/12 on mobile, 3/12 on desktop) */}
          <Col xs={6} lg={3} className="d-flex justify-content-end align-items-center">
              
              {/* Desktop Help Link (Visible on lg and up) */}
              <Nav className="d-none d-lg-flex nav-menu">
                <div className="nav-icon-wrapper d-flex align-items-center gap-2">
                  {/* GA4 Icon Link */}
                  <Nav.Link 
                    href="https://support.google.com/analytics/answer/10917952" 
                    target="_blank" 
                    title="GA4 Guidelines" 
                    className="nav-icon p-0 d-flex align-items-center text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <FaGoogle size={20} />
                  </Nav.Link>
                  {/* Help Text Link */}
                  <Nav.Link 
                    href="https://support.google.com/analytics/answer/10917952" 
                    target="_blank" 
                    title="GA4 Guidelines" 
                    className="p-0 fw-semibold text-sm text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Help
                  </Nav.Link>
                </div>
              </Nav>
              
              {/* Toggler (Visible on mobile/tablet, hidden on desktop) */}
              <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" className="hamburger border-0 p-0 ms-auto">
                  <FaBars size={24} className="text-gray-700" />
              </Navbar.Toggle>

          </Col>
        </Row>
        
        {/* Offcanvas MUST still be a direct child of Container/Navbar to function correctly
            with the Navbar.Toggle button, so it remains outside the Row. */}
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expandBreakpoint}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expandBreakpoint}`}
          placement="end"
        >
          {/* Offcanvas Header (shows a title on mobile) */}
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expandBreakpoint}`}>
              URL-GENius Navigation
            </Offcanvas.Title>
          </Offcanvas.Header>
          
          {/* Offcanvas Body / Nav Menu (Mobile/Tablet View) */}
         <Offcanvas.Body className="d-lg-none">
  <Nav className="justify-content-end flex-grow-1 pe-3 nav-menu">
    <div className="nav-icon-wrapper d-flex align-items-center gap-2 mt-3">
      <Nav.Link 
        href="https://support.google.com/analytics/answer/10917952" 
        target="_blank" 
        title="GA4 Guidelines" 
        className="nav-icon p-0 d-flex align-items-center text-gray-700 hover:text-blue-600 transition-colors"
      >
        <FaGoogle size={20} />
      </Nav.Link>
      <Nav.Link 
        href="https://support.google.com/analytics/answer/10917952" 
        target="_blank" 
        title="GA4 Guidelines" 
        className="p-0 fw-semibold text-sm text-gray-700 hover:text-blue-600 transition-colors"
      >
        Help
      </Nav.Link>
    </div>
  </Nav>
</Offcanvas.Body>

        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Navigation;
