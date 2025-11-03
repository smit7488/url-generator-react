import React from 'react';
import { Row, Col, Form, Alert } from 'react-bootstrap';
import FormInput, { SelectInput } from './FormInput';

const FormSection = ({ formData, errors, handleInputChange, selectedGroups, formType }) => {
  return (
    <>
      {/* Form Type Toggle */}
      <div className="mb-4">
        <label className="form-label fw-bold text-primary-dark">
          Select Form Type:
        </label>
        <div className="d-flex gap-4">
          <Form.Check
            type="radio"
            name="formType"
            value="oneweb"
            label="OneWeb"
            checked={formType === 'oneweb'}
            onChange={handleInputChange}
          />
          <Form.Check
            type="radio"
            name="formType"
            value="gep"
            label="GEP"
            checked={formType === 'gep'}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <Form>
        {/* Dynamic Page URL Label and Help Text */}
        <FormInput
          label={formType === 'oneweb' ? "*OneWeb Page URL:" : "*GEP Page URL:"}
          name="pageUrl"
          value={formData.pageUrl}
          onChange={handleInputChange}
          error={errors.pageUrl}
          helpText={
            formType === 'oneweb' 
              ? "Paste the full URL ending in .aspx, for example: https://www.henryschein.com/us-en/shopping/products.aspx"
              : "Paste the GEP landing page URL, e.g.: https://www.henryschein.com/en-us/search/"
          }
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

        {/* Conditionally show Promo Code for OneWeb */}
        {formType === 'oneweb' && (
          <FormInput
            label="Promo Code"
            name="promo"
            value={formData.promo}
            onChange={handleInputChange}
            error={errors.promo}
            helpText="Enter only one, ex: ABC"
          />
        )}

        {/* Grouped Inputs */}
        <Row className="g-3 mb-3">
          <Col lg={3} md={6}>
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
          <Col lg={3} md={6}>
            <FormInput
              label="*Project Name"
              name="project"
              value={formData.project}
              onChange={handleInputChange}
              helpText="Ex: CADCAM"
              required={!selectedGroups.Generic}
            />
          </Col>
          <Col lg={3} md={6}>
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
          <Col lg={3} md={6}>
            <FormInput
              label="Keyword"
              name="keyword"
              value={formData.keyword}
              onChange={handleInputChange}
              helpText="This should denote the link name, type of ad, or supplier name."
            />
          </Col>
        </Row>

        <Row className="g-3 mb-3">
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
          
          {/* Conditionally show Pricing for OneWeb */}
          {formType === 'oneweb' && (
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
          )}
          
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

        <Alert variant="info" className="mt-4">
          <small>
            <em>
              * denotes a required field for GA4 tagging. Generic (untagged) URLs will generate as long as Page URL is filled out. Rest of URLs will auto-generate once all GA4 required fields have input!
            </em>
          </small>
        </Alert>
      </Form>
    </>
  );
};

export default FormSection;