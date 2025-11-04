import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import FormSection from './FormSection';
import URLResults from './URLResults';
import Navigation from './Navigation';
import Footer from './Footer';
import './MainContent.css'

const MainContent = ({ 
  formData, 
  errors, 
  handleInputChange, 
  selectedGroups, 
  generatedUrls, 
  onCopyAll, 
  isFormValid,
  onToggleMobileFilters 
}) => {
  return (
    <div className="content-column">
      <Navigation onToggleFilters={onToggleMobileFilters} />
      
      <div className="main-content-scrollable">


        {/* Form Section */}
        <Container fluid className="p-0 ">
          <Card className="rounded-0 border-0 background-secondary">
            <Card.Body className="p-4">
                             
              <FormSection
                formData={formData}
                errors={errors}
                handleInputChange={handleInputChange}
                selectedGroups={selectedGroups}
                formType={formData.formType}
              />
            </Card.Body>
          </Card>

          {/* Generated URLs with smooth entrance */}
          {isFormValid && generatedUrls.length > 0 && (
            <div className="mt-2 animate-fade-in">
              <URLResults urls={generatedUrls} onCopyAll={onCopyAll} />
            </div>
          )}
        </Container>
        
        <Footer/>
      </div>
    </div>
  );
};

export default MainContent;