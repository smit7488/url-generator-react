import React from 'react';
import { Container, Card } from 'react-bootstrap';
import FormSection from './FormSection';
import URLResults from './URLResults';
import Navigation from './Navigation';
import Footer from './Footer';

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
      {/* Navigation inside the scrollable area */}
      <Navigation onToggleFilters={onToggleMobileFilters} />
      
      {/* Scrollable content area */}
      <div className="main-content-scrollable">
        <Container fluid className="p-0">
          <Card className="rounded-0 border-0 shadow">
            <Card.Body className="p-4">
              <h4 className="text-primary-dark mb-4">URL Configuration</h4>
              
              <FormSection
                formData={formData}
                errors={errors}
                handleInputChange={handleInputChange}
                selectedGroups={selectedGroups}
                formType={formData.formType}
              />
            </Card.Body>
          </Card>

          {/* Generated URLs */}
          {isFormValid && generatedUrls.length > 0 && (
            <div className="mt-4">
              <URLResults urls={generatedUrls} onCopyAll={onCopyAll} />
            </div>
          )}
        </Container>
        
        {/* Footer inside the scrollable area */}
        <Footer/>
      </div>
    </div>
  );
};

export default MainContent;