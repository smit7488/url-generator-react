import React, { useState } from 'react';
import { Row, Col, Form, Alert, Card, Container } from 'react-bootstrap';
import FormInput, { SelectInput } from './FormInput';
import './FormSection.css';

const FormSection = ({ formData, errors, handleInputChange, selectedGroups, formType }) => {
  const [isSwitching, setIsSwitching] = useState(false);

  const handleFormTypeChange = (e) => {
    setIsSwitching(true);
    handleInputChange(e);
    setTimeout(() => setIsSwitching(false), 300);
  };

  // Check if any conditional inputs need to be shown
  const showConditionalInputs = 
    selectedGroups.EmailMarketoSCS ||
    selectedGroups.EmailMarketoMktg ||
    selectedGroups.EmailFeaturedBannerMarketoSCSFeaturedBanner ||
    selectedGroups.EmailFeaturedBannerMarketoMktgFeaturedBanner ||
    selectedGroups.QRCodeNxtBook ||
    selectedGroups.QRCodeExternal ||
    selectedGroups.VanityURLs ||
    selectedGroups.WebsiteLinkingAgreement ||
    selectedGroups.QRCode ||
    selectedGroups.TradePublicationEmail ||
    selectedGroups.TradePublicationWebsite;

  return (
    <div className={`form-section ${isSwitching ? 'opacity-50' : ''}`}>
      <Container>
        <Form className="mt-2">
          {/* Header and Toggle Switch */}
          <Row className="g-3 mb-4 align-items-center">
            <Col xl={9} md={8}>
              <div className="mb-2">
                <h2 className="h3 fw-bold text-primary-dark mb-2">Let's Tag Some URLs!</h2>
                <p className="text-muted">
                  Fill in the details below to generate tagged URLs for your campaign
                </p>
              </div>
            </Col>

            <Col xl={3} md={4}>
              <Card className="border-1 text-center">
                <Card.Body>
                  <div className="d-flex justify-content-center align-items-center">
                    <span className={`fw-semibold ${formType === 'oneweb' ? 'text-primary' : 'text-muted'}`}>
                      OneWeb
                    </span>
                    
                    <Form.Check type="switch" id="form-type-switch" className="mx-2">
                      <Form.Check.Input
                        type="checkbox"
                        checked={formType === 'gep'}
                        onChange={(e) => {
                          const newFormType = e.target.checked ? 'gep' : 'oneweb';
                          const syntheticEvent = {
                            target: {
                              name: 'formType',
                              value: newFormType
                            }
                          };
                          handleFormTypeChange(syntheticEvent);
                        }}
                        className="form-type-switch"
                      />
                      <Form.Check.Label className="visually-hidden">
                        Switch between OneWeb and GEP
                      </Form.Check.Label>
                    </Form.Check>
                    
                    <span className={`fw-semibold ${formType === 'gep' ? 'text-primary' : 'text-muted'}`}>
                      GEP
                    </span>
                  </div>
                  <small className="text-muted mt-2 d-block">
                    Currently generating URLs for: <strong className="text-primary">{formType.toUpperCase()}</strong>
                  </small>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* ALL FORM INPUTS IN ONE ROW */}
          <Row className="g-3 mb-4">
            {/* Page URL - Full width on mobile, half on desktop */}
            <Col xl={6} md={12}>
              <FormInput
                label={formType === 'oneweb' ? "OneWeb Page URL" : "GEP Page URL"}
                name="pageUrl"
                value={
                  formData.pageUrl ||
                  (formType === 'oneweb'
                    ? "https://www.henryschein.com/us-en/shopping/products.aspx"
                    : "https://www.henryschein.com/en-us/search/")
                }
                onChange={handleInputChange}
                error={errors.pageUrl}
                helpText={
                  formType === 'oneweb'
                    ? "Paste the full URL ending in .aspx, for example: https://www.henryschein.com/us-en/shopping/products.aspx"
                    : "Paste the GEP landing page URL, e.g.: https://www.henryschein.com/en-us/search/"
                }
                required
              />
            </Col>

            {/* Item Codes - Full width on mobile, half on desktop */}
            <Col xl={6} md={12}>
              <FormInput
                label="Item Codes"
                name="items"
                value={formData.items}
                onChange={handleInputChange}
                error={errors.items}
                helpText="Comma-separated 7-digit codes (e.g., 5702440,1126402,1126403)"
              />
            </Col>

            {/* Promo Code for OneWeb */}
            {formType === 'oneweb' && (
              <Col xl={4} lg={6} md={6} className="animate-slide-down">
                <FormInput
                  label="Promo Code"
                  name="promo"
                  value={formData.promo}
                  onChange={handleInputChange}
                  error={errors.promo}
                  helpText="Enter only one, ex: ABC"
                />
              </Col>
            )}

            {/* Required Fields - Three Columns */}
            <Col xl={4} lg={6} md={6}>
              <FormInput
                label="*Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                helpText="Select the live date"
                required={!selectedGroups.Generic}
              />
            </Col>
            
            <Col xl={4} lg={6} md={6}>
              <FormInput
                label="*Project Name"
                name="project"
                value={formData.project}
                onChange={handleInputChange}
                helpText="Ex: CADCAM"
                required={!selectedGroups.Generic}
              />
            </Col>
            
            <Col xl={4} lg={6} md={6}>
              <FormInput
                label="*Job Number"
                name="jobNumber"
                value={formData.jobNumber}
                onChange={handleInputChange}
                error={errors.jobNumber}
                helpText="Ex: 24DS2828"
                required={!selectedGroups.Generic}
              />
            </Col>
            
            <Col xl={4} lg={6} md={6}>
              <SelectInput
                label="*Division"
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
                required={!selectedGroups.Generic}
              />
            </Col>
            
            {/* Show Pricing for OneWeb */}
            {formType === 'oneweb' && (
              <Col xl={4} lg={6} md={6} className="animate-slide-down">
                <SelectInput
                  label="*Show Pricing?"
                  name="pricing"
                  value={formData.pricing}
                  onChange={handleInputChange}
                  options={[
                    { value: 'dp=true', label: 'Yes' },
                    { value: 'dp=false', label: 'No' }
                  ]}
                  required={!selectedGroups.Generic}
                />
              </Col>
            )}

            {/* Conditional Inputs */}
            {/* Marketo Folder */}
            {(selectedGroups.EmailMarketoSCS ||
              selectedGroups.EmailMarketoMktg ||
              selectedGroups.EmailFeaturedBannerMarketoSCSFeaturedBanner ||
              selectedGroups.EmailFeaturedBannerMarketoMktgFeaturedBanner) && (
              <Col xl={4} lg={6} md={6} className="animate-slide-down">
                <FormInput
                  label="Marketo Folder"
                  name="marketoFolderName"
                  value={formData.marketoFolderName}
                  onChange={handleInputChange}
                  helpText="Enter the Full Marketo Folder Name (e.g., EM-20240710-MedicomSterilization-12097-FL-DNTL)"
                  required
                />
              </Col>
            )}

            {/* QR Code Content */}
            {(selectedGroups.QRCodeNxtBook || selectedGroups.QRCodeExternal) && (
              <Col xl={4} lg={6} md={6} className="animate-slide-down">
                <FormInput
                  label="QR Code Content"
                  name="qrCodeContent"
                  value={formData.qrCodeContent}
                  onChange={handleInputChange}
                  helpText="Enter the product name or category for the QR code (e.g., Alloys)"
                  required
                />
              </Col>
            )}

            {/* Vanity URL */}
            {selectedGroups.VanityURLs && (
              <Col xl={4} lg={6} md={6} className="animate-slide-down">
                <FormInput
                  label="Vanity URL"
                  name="vanity"
                  value={formData.vanity}
                  onChange={handleInputChange}
                  helpText="Ex: henryscheindigital.com/25Colgate"
                  required
                />
              </Col>
            )}

            {/* Vendor Name */}
            {selectedGroups.WebsiteLinkingAgreement && (
              <Col xl={4} lg={6} md={6} className="animate-slide-down">
                <FormInput
                  label="Vendor Name"
                  name="webLinkVendorName"
                  value={formData.webLinkVendorName}
                  onChange={handleInputChange}
                  helpText="Enter the Vendor Name"
                />
              </Col>
            )}

            {/* Custom QR Source */}
            {selectedGroups.QRCode && (
              <Col xl={4} lg={6} md={6} className="animate-slide-down">
                {selectedGroups.QRCode.subcategories.map(
                  (sub) =>
                    sub.requiresInput && (
                      <FormInput
                        key={sub.key}
                        label="Custom QR Source"
                        name="customQRSource"
                        value={formData.customQRSource || ""}
                        onChange={handleInputChange}
                        helpText="Enter a custom source for QR Code tracking"
                      />
                    )
                )}
              </Col>
            )}

            {/* Trade Publication Fields */}
            {(selectedGroups.TradePublicationEmail || selectedGroups.TradePublicationWebsite) && (
              <>
                <Col xl={4} lg={6} md={6} className="animate-slide-down">
                  <FormInput
                    label="Trade Publication Name"
                    name="tradePublicationName"
                    value={formData.tradePublicationName}
                    onChange={handleInputChange}
                    helpText="Enter Trade Publication Name"
                  />
                </Col>
                <Col xl={4} lg={6} md={6} className="animate-slide-down">
                  <FormInput
                    label="Trade Publication Link Name"
                    name="tradePublicationLink"
                    value={formData.tradePublicationLink}
                    onChange={handleInputChange}
                    helpText="Enter Trade Publication Link Name"
                  />
                </Col>
              </>
            )}
          </Row>

          {/* Info Alert */}
          <Alert variant="info" className="mt-4 border-0 bg-light-primary">
            <div className="d-flex">
              <i className="fas fa-info-circle me-2 mt-1 text-primary"></i>
              <div>
                <strong>Quick Tip:</strong>
                <small className="d-block mt-1">
                  <em>
                    * denotes a required field for GA4 tagging. Generic (untagged) URLs will generate as long as Page URL is filled out. 
                    Rest of URLs will auto-generate once all GA4 required fields have input!
                  </em>
                </small>
              </div>
            </div>
          </Alert>
        </Form>
      </Container>
    </div>
  );
};

export default FormSection;