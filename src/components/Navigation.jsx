import React from 'react';
import { Navbar, Container, Nav, Offcanvas, Row, Col } from 'react-bootstrap';
import { FaGoogle, FaBars, FaFilter } from 'react-icons/fa'; 
import urlIcon from '../assets/icon.svg'
import './Navigation.css';

const HenryScheinLogo = () => (
  <img 
    src={urlIcon}
    alt="Henry Schein" 
    height="30" 
    className="d-inline-block align-top me-2"
    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/100x30/00406d/ffffff?text=HS+Logo"; }}
  />
);

const Navigation = ({ onToggleFilters }) => {
  const expandBreakpoint = 'md';

  return (
    <Navbar 
      expand={expandBreakpoint} 
      className="shadow-sm bg-white border-bottom" 
      sticky="top"
      data-bs-theme="light"
    >
      <Container fluid className="nav-inner py-2 px-3">
        <Row className="w-100 align-items-center g-0">
          
          {/* Col 1: Logo and Title */}
          <Col xs={6} lg={3} className="d-flex align-items-center">
            <div className="logo-wrapper d-flex align-items-center me-3">
                <Navbar.Brand href="/" className="d-flex align-items-center logo p-0">
                    <HenryScheinLogo /><h1 className="logo-text fw-bold text-lg text-gray-800 m-0 d-none d-sm-block">
                    URL-GENius
                </h1>
                </Navbar.Brand>
            </div>
          </Col>
          
          {/* Col 2: Headline / Subtitle (Desktop Only) */}
          <Col lg={6} className="d-none d-lg-flex justify-content-center">
              <p className="nav-headline text-sm text-muted m-0">
                  A GA4-Tagged URL Generator
              </p>
          </Col>
          
          {/* Col 3: Desktop Help Link and Toggler */}
          <Col xs={6} lg={3} className="d-flex justify-content-end align-items-center">
              
              {/* Mobile Filter Toggle Button (Visible on mobile/tablet) */}
              <button 
                className="btn btn-outline-primary d-lg-none me-2 d-flex align-items-center"
                onClick={onToggleFilters}
                aria-label="Toggle filters"
              >
                <FaFilter className="me-1" />
                Filters
              </button>
              
              {/* Desktop Help Link (Visible on lg and up) */}
              <Nav className="d-none d-lg-flex nav-menu">
                <div className="nav-icon-wrapper d-flex align-items-center gap-2">
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
              
              {/* Hamburger Menu Toggler */}
              <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" className="hamburger border-0 p-0 ms-2">
                  <FaBars size={24} className="text-gray-700" />
              </Navbar.Toggle>

          </Col>
        </Row>
        
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expandBreakpoint}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expandBreakpoint}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expandBreakpoint}`}>
              URL-GENius Navigation
            </Offcanvas.Title>
          </Offcanvas.Header>
          
          <Offcanvas.Body className="d-lg-none">
           
            <Nav className="justify-content-end flex-grow-1 pe-3 nav-menu">
              <div className="nav-icon-wrapper d-flex align-items-center gap-2">
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