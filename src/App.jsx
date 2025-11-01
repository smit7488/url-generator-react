import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import FormInput, { SelectInput } from './components/FormInput';
import FilterPanel from './components/FilterPanel';
import URLResults from './components/URLResults';
import UpdatesSidebar from './components/UpdatesSidebar';
import { useFormValidation } from './hooks/useFormValidation';
import { useURLGenerator } from './hooks/useURLGenerator';
import { urlCategories } from './data/urlCategories';
import { Container, Row, Col, Card, Form, Button, Offcanvas, Alert } from 'react-bootstrap';
import Navigation from './components/Navigation';

const App = () => {
  const { formData, errors, handleInputChange } = useFormValidation({
    pageUrl: '',
    items: '',
    promo: '',
    date: '',
    project: '',
    jobNumber: '',
    division: 'dental',
    pricing: 'dp=false',
    vanity: '',
    webLinkVendorName: '',
    tradePublicationName: '',
    tradePublicationLink: '',
    marketoFolderName: '',
    qrCodeContent: ''
  });

  const [selectedGroups, setSelectedGroups] = useState({
    PaidDisplayAdsAdRoll: true,
    PaidDisplayAdsAdAdvance: true,
    PaidDisplayAdsRichRelevance: true,
    SocialInstagram: true,
    SocialTwitter: true,
    SocialFacebook: true,
    SocialYouTube: true,
    SocialLinkedIn: true
  });

  const [showUpdates, setShowUpdates] = useState(false);

  const { generatedUrls } = useURLGenerator(formData, selectedGroups);

  const handleCheckboxChange = (key) => {
    setSelectedGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const copyAllURLs = () => {
    const text = generatedUrls.map(group => 
      `${group.category}\n${group.urls.map(u => `${u.name}: ${u.url}`).join('\n')}`
    ).join('\n\n');
    navigator.clipboard.writeText(text);
    alert('Content copied to clipboard!');
  };

  const isFormValid = formData.pageUrl && formData.date && formData.project && formData.jobNumber;

  return (
       <div className="app-container min-vh-100 vw-100 w-100 bg-light">
        <Navigation></Navigation>
      <Container>
        <Row className="g-0">
          <Col xs={12}>
            <Header />
          </Col>
        </Row>

        <Row className="g-4">
          {/* Left Column - Filters */}
          <Col lg={3} md={4}>
            <div className="sticky-top" style={{ top: '1rem' }}>
              <FilterPanel
                categories={urlCategories}
                selectedGroups={selectedGroups}
                onCheckboxChange={handleCheckboxChange}
              />
            </div>
          </Col>

          {/* Right Column - Form Inputs */}
          <Col lg={9} md={8}>
            <Card className="shadow-lg rounded-lg">
              <Card.Body className="p-4">
                <h4 className="text-primary-dark mb-4">URL Configuration</h4>

                <Form>
                  {/* Form Inputs replaced with Form.Group, etc. handled by FormInput component */}
                  <FormInput
                    label="Page URL"
                    name="pageUrl"
                    value={formData.pageUrl}
                    onChange={handleInputChange}
                    error={errors.pageUrl}
                    helpText="Paste the full URL ending in .aspx"
                    required
                  />

                  <FormInput
                    label="Item Codes"
                    name="items"
                    value={formData.items}
                    onChange={handleInputChange}
                    error={errors.items}
                    helpText="Comma-separated 7-digit codes (e.g., 5702440,1126402,1126403)"
                  />

                  {/* Grouped Inputs using react-bootstrap Row and Col */}
                  <Row className="g-3 mb-3">
                    <Col lg={3} md={6}>
                      <FormInput
                        label="Promo Code"
                        name="promo"
                        value={formData.promo}
                        onChange={handleInputChange}
                        error={errors.promo}
                        helpText="Enter one promo code"
                      />
                    </Col>
                    <Col lg={3} md={6}>
                      <FormInput
                        label="Date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        helpText="Select the live date"
                        required
                      />
                    </Col>
                    <Col lg={3} md={6}>
                      <FormInput
                        label="Project Name"
                        name="project"
                        value={formData.project}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col lg={3} md={6}>
                      <FormInput
                        label="Job Number"
                        name="jobNumber"
                        value={formData.jobNumber}
                        onChange={handleInputChange}
                        error={errors.jobNumber}
                        helpText="Ex: 24DS2828"
                        required
                      />
                    </Col>
                  </Row>

                  <Row className="g-3 mb-3">
                    <SelectInput
                      label="Division"
                      name="division"
                      value={formData.division}
                      onChange={handleInputChange}
                      options={[
                        { value: 'dental', label: 'Dental' },
                        { value: 'medical', label: 'Medical' },
                        { value: 'insource', label: 'Insource' },
                        { value: 'international', label: 'International' },
                        { value: 'specialmarkets', label: 'Special Markets' },
                        { value: 'zahn', label: 'Zahn' },
                        { value: '340b', label: '340b' },
                        { value: 'corporate', label: 'Corporate' }
                      ]}
                      required
                    />
                    <SelectInput
                      label="Show Pricing?"
                      name="pricing"
                      value={formData.pricing}
                      onChange={handleInputChange}
                      options={[
                        { value: 'dp=true', label: 'Yes' },
                        { value: 'dp=false', label: 'No' }
                      ]}
                      required
                    />
                    <Col md={4}>
                      <FormInput
                        label="Vanity URL"
                        name="vanity"
                        value={formData.vanity}
                        onChange={handleInputChange}
                        helpText="Ex: henryscheindigital.com/25Colgate"
                      />
                    </Col>
                  </Row>

                  {/* Conditional Inputs */}
                  {(selectedGroups.EmailMarketoSCS ||
                    selectedGroups.EmailMarketoMktg ||
                    selectedGroups.EmailFeaturedBannerMarketoSCSFeaturedBanner ||
                    selectedGroups.EmailFeaturedBannerMarketoMktgFeaturedBanner) && (
                      <FormInput
                        label="Marketo Folder"
                        name="marketoFolderName"
                        value={formData.marketoFolderName}
                        onChange={handleInputChange}
                        helpText="Enter the Full Marketo Folder Name (e.g., EM-20240710-MedicomSterilization-12097-FL-DNTL)"
                        required
                      />
                    )}

                  {(selectedGroups.QRCodeNxtBook || selectedGroups.QRCodeExternal) && (
                    <FormInput
                      label="QR Code Content"
                      name="qrCodeContent"
                      value={formData.qrCodeContent}
                      onChange={handleInputChange}
                      helpText="Enter the product name or category for the QR code (e.g., Alloys)"
                      required
                    />
                  )}

                  {selectedGroups.WebsiteLinkingAgreement && (
                    <FormInput
                      label="Vendor Name"
                      name="webLinkVendorName"
                      value={formData.webLinkVendorName}
                      onChange={handleInputChange}
                      helpText="Enter the Vendor Name"
                    />
                  )}

                  {(selectedGroups.TradePublicationEmail || selectedGroups.TradePublicationWebsite) && (
                    <>
                      <FormInput
                        label="Trade Publication Name"
                        name="tradePublicationName"
                        value={formData.tradePublicationName}
                        onChange={handleInputChange}
                        helpText="Enter Trade Publication Name"
                      />
                      <FormInput
                        label="Trade Publication Link Name"
                        name="tradePublicationLink"
                        value={formData.tradePublicationLink}
                        onChange={handleInputChange}
                        helpText="Enter Trade Publication Link Name"
                      />
                    </>
                  )}

                  <Button variant="primary" type="submit" className="mt-4 rounded-pill px-4">
                    Generate URL
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            {/* Generated URLs */}
            {isFormValid && generatedUrls.length > 0 && (
              <URLResults urls={generatedUrls} onCopyAll={copyAllURLs} />
            )}
          </Col>
        </Row>
      </Container>

      {/* Updates Sidebar replaced with React-Bootstrap Offcanvas */}
      <UpdatesSidebar show={showUpdates} onToggle={() => setShowUpdates(!showUpdates)} />

      <footer className="text-center mt-4 pb-3 footer-text">
        <small>
          Created by <a href="mailto:Trevor.Smith@henryschein.com?subject=URL%20Generator&cc=Greg.Kowalczyk@henryschein.com" className="footer-link text-primary" onClick={() => setShowUpdates(true)}>Trevor Smith</a>
        </small>
      </footer>
    </div>
  );
};

export default App;
