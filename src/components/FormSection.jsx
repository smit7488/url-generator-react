import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Alert, Card, Container, Dropdown } from 'react-bootstrap';
import FormInput, { SelectInput } from './FormInput';
import './FormSection.css';
import { flags } from '../assets/flags';

const FormSection = ({ formData, errors, handleInputChange, selectedGroups, formType, removeSpacesFromItems }) => {
  const [isSwitching, setIsSwitching] = useState(false);
  const [spaceRemovalMessage, setSpaceRemovalMessage] = useState('');

  // Country configuration
  const COUNTRY_CONFIG = {
    oneweb: {
      us: {
        label: 'United States',
        shortLabel: 'US',
        flag: flags.us,
        url: 'https://www.henryschein.com/us-en/shopping/products.aspx',
        itemCodePattern: /^\d{7}$/,
        itemCodeHelp: 'Comma-separated 7-digit codes (e.g., 5702440,1126402,1126403)'
      },
      uk: {
        label: 'United Kingdom',
        shortLabel: 'UK',
        flag: flags.uk,
        url: 'https://www.henryschein.co.uk/gb-en/shopping/products.aspx',
        itemCodePattern: /^[A-Za-z0-9]{1,10}$/,
        itemCodeHelp: 'Comma-separated item codes, can be alphanumeric (e.g., 0915,101025,1130364,H085413)'
      },
      kentExpress: {
        label: 'Kent Express',
        shortLabel: 'KE',
        flag: flags.uk,
        url: 'https://www.kentexpress.co.uk/gb-en/shopping/products.aspx',
        itemCodePattern: /^[A-Za-z0-9]{1,10}$/,
        itemCodeHelp: 'Comma-separated item codes, can be alphanumeric (e.g., KX228006,9792761,207388)'
      },
      ireland: {
        label: 'Ireland',
        shortLabel: 'IE',
        flag: flags.ie,
        url: 'https://www.henryschein.ie/ie-en/shopping/products.aspx',
        itemCodePattern: /^\d{7}$/,
        itemCodeHelp: 'Comma-separated 7-digit codes (e.g., 5702440,1126402,1126403)'
      },
      canadaEn: {
        label: 'Canada (English)',
        shortLabel: 'CA-EN',
        flag: flags.ca,
        url: 'https://www.henryschein.ca/ca-en/shopping/products.aspx',
        itemCodePattern: /^\d{7}$/,
        itemCodeHelp: 'Comma-separated 7-digit codes (e.g., 5702440,1126402,1126403)'
      },
      canadaFr: {
        label: 'Canada (Français)',
        shortLabel: 'CA-FR',
        flag: flags.ca,
        url: 'https://www.henryschein.ca/ca-fr/shopping/products.aspx',
         itemCodePattern: /^\d{7}$/,
        itemCodeHelp: 'Comma-separated 7-digit codes (e.g., 5702440,1126402,1126403)'
      },
        france: {
        label: 'France',
        shortLabel: 'FR-FR',
        flag: flags.fr,
        url: 'https://www.henryschein.fr/fr-fr/shopping/products.aspx',
        itemCodePattern: /^\d{3}-\d{4}$/,
        itemCodeHelp: 'Comma-separated codes in the format 878-0128, 123-4567, etc.'
      }
      
    },
    gep: {
      us: {
        label: 'United States',
        shortLabel: 'US',
        flag: flags.us,
        url: 'https://www.henryschein.com/en-us/search/',
        itemCodePattern: /^\d{7}$/,
        itemCodeHelp: 'Comma-separated 7-digit codes (e.g., 5702440,1126402,1126403)'
      },
      uk: {
        label: 'United Kingdom',
        shortLabel: 'UK',
        flag: flags.uk,
        url: 'https://www.henryschein.co.uk/search/',
        itemCodePattern: /^[A-Za-z0-9]{1,10}$/,
        itemCodeHelp: 'Comma-separated item codes, can be alphanumeric (e.g., 0915,101025,1130364,H085413)'
      },
        kentExpress: {
        label: 'Kent Express',
        shortLabel: 'KE',
        flag: flags.uk,
        url: 'https://www.kentexpress.co.uk/search/',
        itemCodePattern: /^[A-Za-z0-9]{1,10}$/,
        itemCodeHelp: 'Comma-separated item codes, can be alphanumeric (e.g., KX228006,9792761,207388)'
      },
      ireland: {
        label: 'Ireland',
        shortLabel: 'IE',
        flag: flags.ie,
        url: 'https://www.henryschein.ie/search/',
        itemCodePattern: /^\d{7}$/,
        itemCodeHelp: 'Comma-separated 7-digit codes (e.g., 5702440,1126402,1126403)'
      },
      canadaEn: {
        label: 'Canada (English)',
        shortLabel: 'CA-EN',
        flag: flags.ca,
        url: 'https://www.henryschein.ca/en-ca/search/',
        itemCodePattern: /^\d{7}$/,
        itemCodeHelp: 'Comma-separated 7-digit codes (e.g., 5702440,1126402,1126403)'
      },
      canadaFr: {
        label: 'Canada (Français)',
        shortLabel: 'CA-FR',
        flag: flags.ca,
        url: 'https://www.henryschein.ca/fr-ca/search/',
        itemCodePattern: /^\d{7}$/,
        itemCodeHelp: 'Comma-separated 7-digit codes (e.g., 5702440,1126402,1126403)'
      },
      france: {
        label: 'France',
        shortLabel: 'FR-FR',
        flag: flags.fr,
        url: 'https://www.henryschein.fr/search/',
        itemCodePattern: /^\d{3}-\d{4}$/,
        itemCodeHelp: 'Comma-separated codes in the format 878-0128, 123-4567, etc.'
      }
    }
  };

  const handleFormTypeChange = (e) => {
    setIsSwitching(true);
    handleInputChange(e);
    setTimeout(() => setIsSwitching(false), 300);
  };

  // Get current country or default to 'us'
  const currentCountry = formData.country || 'us';
  const countryConfig = COUNTRY_CONFIG[formType][currentCountry];

  // Update URL when country or formType changes
  useEffect(() => {
    const newUrl = COUNTRY_CONFIG[formType][currentCountry]?.url;
    if (newUrl && formData.pageUrl !== newUrl) {
      handleInputChange({
        target: {
          name: 'pageUrl',
          value: newUrl
        }
      });
    }
  }, [currentCountry, formType]);

  // Handle country selection
  const handleCountrySelect = (countryKey) => {
    handleInputChange({
      target: {
        name: 'country',
        value: countryKey
      }
    });
    
    const newUrl = COUNTRY_CONFIG[formType][countryKey]?.url;
    if (newUrl) {
      handleInputChange({
        target: {
          name: 'pageUrl',
          value: newUrl
        }
      });
    }
  };

  // Handle remove spaces with notification
  const handleRemoveSpaces = () => {
    const originalValue = formData.items || '';
    
    if (!originalValue) {
      setSpaceRemovalMessage('No item codes to clean');
      setTimeout(() => setSpaceRemovalMessage(''), 2000);
      return;
    }

    // Count spaces before removal
    const spaceCount = (originalValue.match(/\s/g) || []).length;
    
    if (spaceCount === 0) {
      setSpaceRemovalMessage('No spaces found');
      setTimeout(() => setSpaceRemovalMessage(''), 2000);
      return;
    }

    // Call the removal function which updates the actual form input
    const cleanedValue = removeSpacesFromItems();
    
    // Show success message
    setSpaceRemovalMessage(`Removed ${spaceCount} space${spaceCount === 1 ? '' : 's'}`);
    setTimeout(() => setSpaceRemovalMessage(''), 3000);
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
            {/* Page URL with Country Selector */}
            <Col xl={7} md={12}>
              <Form.Group>
                <Form.Label className="fw-bold text-primary-dark">
                  {formType === 'oneweb' ? "OneWeb Page URL" : "GEP Page URL"}
                  <span className="text-danger"> *</span>
                </Form.Label>
                
                <div className="d-flex gap-2 flex-wrap">
                  {/* Country Dropdown */}
                  <Dropdown onSelect={handleCountrySelect}>
                    <Dropdown.Toggle 
                      variant="outline-secondary" 
                      id="country-dropdown"
                      className="d-flex align-items-center px-3"
                      style={{ minWidth: '180px' }}
                    >
                      <img 
                        src={countryConfig.flag}
                        alt={`${countryConfig.label} flag`}
                        style={{ 
                          width: '28px', 
                          height: '14px', 
                          marginRight: '8px',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <span className="flex-grow-1 text-start">
                        {countryConfig.label}
                      </span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {Object.entries(COUNTRY_CONFIG[formType]).map(([key, config]) => (
                        <Dropdown.Item 
                          key={key}
                          eventKey={key}
                          active={currentCountry === key}
                        >
                          <div className="d-flex align-items-center">
                            <img 
                              src={config.flag}
                              alt={`${config.label} flag`}
                              style={{ 
                                width: '28px', 
                                height: '14px', 
                                marginRight: '8px',
                                objectFit: 'cover'
                              }}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                            <span>{config.label}</span>
                          </div>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  
                  {/* URL Input */}
                  <div className="flex-grow-1">
                    <Form.Control
                      type="text"
                      name="pageUrl"
                      value={formData.pageUrl || countryConfig.url}
                      onChange={handleInputChange}
                      isInvalid={!!errors.pageUrl}
                      required
                    />
                    {errors.pageUrl && (
                      <Form.Control.Feedback type="invalid">
                        {errors.pageUrl}
                      </Form.Control.Feedback>
                    )}
                  </div>
                </div>
                
                <Form.Text className="text-muted">
                  {formType === 'oneweb'
                    ? "Paste the full URL ending in .aspx"
                    : `Default URL for ${countryConfig.label}. Modify if needed.`}
                </Form.Text>
              </Form.Group>
            </Col>

            {/* Item Codes with Remove Spaces Button */}
            <Col xl={5} md={12}>
              <div className="mb-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <label className="form-label fw-bold text-primary-dark mb-0">
                    Item Codes
                    {formData.items && formData.items.trim() && (
                      <span className="badge bg-primary ms-2" style={{ fontSize: '0.7rem', fontWeight: 'normal' }}>
                        {formData.items.split(',').filter(code => code.trim()).length} {formData.items.split(',').filter(code => code.trim()).length === 1 ? 'code' : 'codes'}
                      </span>
                    )}
                  </label>
                  <div className="d-flex align-items-center gap-2">
                    {spaceRemovalMessage && (
                      <span 
                        className="text-success small fw-semibold animate-fade-in"
                        style={{ fontSize: '0.75rem' }}
                      >
                        <i className="fas fa-check-circle me-1"></i>
                        {spaceRemovalMessage}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={handleRemoveSpaces}
                      className="btn btn-sm btn-outline-secondary"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                    >
                      <i className="fas fa-broom me-1"></i>
                      Remove Spaces
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  className={`form-control ${errors.items ? 'is-invalid' : ''}`}
                  name="items"
                  value={formData.items}
                  onChange={handleInputChange}
                />
                {errors.items && <div className="invalid-feedback">{errors.items}</div>}
                {countryConfig.itemCodeHelp && (
                  <small className="form-text text-muted d-block mt-1">
                    {countryConfig.itemCodeHelp}
                  </small>
                )}
              </div>
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
                label="Date"
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
                label="Project Name"
                name="project"
                value={formData.project}
                onChange={handleInputChange}
                helpText="Ex: CADCAM"
                required={!selectedGroups.Generic}
              />
            </Col>
            
            <Col xl={4} lg={6} md={6}>
              <FormInput
                label="Job Number"
                name="jobNumber"
                value={formData.jobNumber}
                onChange={handleInputChange}
                error={errors.jobNumber}
                helpText="Ex: 26DS2828"
                required={!selectedGroups.Generic}
              />
            </Col>
            
            <Col xl={4} lg={6} md={6}>
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
                required={!selectedGroups.Generic}
              />
            </Col>
            
            {/* Show Pricing for OneWeb */}
            {formType === 'oneweb' && (
              <Col xl={4} lg={6} md={6} className="animate-slide-down">
                <SelectInput
                  label="Show Pricing?"
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