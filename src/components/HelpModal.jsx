import React from 'react';
import { Modal, Accordion, Container, Row, Col, Badge, ListGroup, Card } from 'react-bootstrap';
import { FaQuestionCircle, FaBook, FaCog, FaExclamationTriangle } from 'react-icons/fa';
import './HelpModal.css';

const HelpModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="help-modal">
      <Modal.Header closeButton className="border-bottom-2 bg-light">
        <Modal.Title className="fw-bold d-flex align-items-center gap-2">
          <FaQuestionCircle className="text-primary" />
          URL-GENius Help & Documentation
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="help-modal-body">
        <Container fluid className="p-0">
          {/* About Section */}
          <div className="mb-4">
            <h5 className="fw-bold text-primary mb-3 d-flex align-items-center gap-2">
              <FaBook /> About This Tool
            </h5>
            <Card className="border-0 bg-light">
              <Card.Body>
                <p className="mb-2">
                  <strong>URL-GENius</strong> is a GA4-tagged URL generator designed for Henry Schein marketing professionals. 
                  It streamlines the creation of UTM-tagged URLs for tracking campaign performance across various marketing channels.
                </p>
                <p className="mb-0">
                  The tool supports both <strong>OneWeb</strong> and <strong>GEP</strong> platforms, allowing you to generate 
                  multiple tagged URLs for different marketing channels simultaneously, ensuring consistent tracking across your campaigns.
                </p>
              </Card.Body>
            </Card>
          </div>

          {/* Quick Start */}
          <div className="mb-4">
            <h5 className="fw-bold text-primary mb-3 d-flex align-items-center gap-2">
              <FaCog /> Quick Start Guide
            </h5>
            <Card className="border-0 bg-light">
              <Card.Body>
                <ol className="mb-0">
                  <li className="mb-2">
                    <strong>Select Form Type:</strong> Choose between OneWeb or GEP using the toggle switch
                  </li>
                  <li className="mb-2">
                    <strong>Enter Base URL:</strong> Paste your product page URL (automatically populated with default)
                  </li>
                  <li className="mb-2">
                    <strong>Fill Required Fields:</strong> For GA4 tagging, fill Date, Project, Job Number, and Division
                  </li>
                  <li className="mb-2">
                    <strong>Select Categories:</strong> Choose which marketing channels you need URLs for from the Filters panel
                  </li>
                  <li className="mb-2">
                    <strong>Copy URLs:</strong> Click "Copy All" or copy individual URLs to use in your campaigns
                  </li>
                </ol>
              </Card.Body>
            </Card>
          </div>

          {/* Accordion FAQs */}
          <h5 className="fw-bold text-primary mb-3">Frequently Asked Questions</h5>
          <Accordion defaultActiveKey="0" className="help-accordion">
            
            <Accordion.Item eventKey="0">
              <Accordion.Header>What is GA4 tagging and why do I need it?</Accordion.Header>
              <Accordion.Body>
                <p>
                  GA4 (Google Analytics 4) tagging uses UTM parameters to track the source, medium, campaign, content, and term of your traffic. 
                  This helps marketing teams understand which channels drive the most valuable traffic and conversions.
                </p>
                <p className="mb-0">
                  <strong>UTM Parameters:</strong>
                </p>
                <ul className="mt-2 mb-0">
                  <li><code>utm_source</code> - Where the traffic originates (e.g., Google, Meta, Telesales)</li>
                  <li><code>utm_medium</code> - The marketing medium (e.g., CPC, Social, Email)</li>
                  <li><code>utm_campaign</code> - The specific campaign (automatically formatted as Date-Project-JobNumber)</li>
                  <li><code>utm_content</code> - The specific link or content element within the campaign</li>
                  <li><code>utm_term</code> - Used to track the division or market segment</li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>What's the difference between OneWeb and GEP?</Accordion.Header>
              <Accordion.Body>
                <p>
                  <strong>OneWeb</strong> and <strong>GEP</strong> are two different Henry Schein platforms with different URL structures:
                </p>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <h6 className="fw-bold">OneWeb</h6>
                    <ul className="small mb-0">
                      <li>Uses .aspx product pages</li>
                      <li>Supports promo codes</li>
                      <li>Has "Show Pricing" toggle (dp parameter)</li>
                      <li>Standard URL parameters</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold">GEP</h6>
                    <ul className="small mb-0">
                      <li>Uses search endpoint</li>
                      <li>Item codes formatted in URL path</li>
                      <li>No promo code or pricing parameters</li>
                      <li>Optimized search results</li>
                    </ul>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>What fields are required for GA4 tagging?</Accordion.Header>
              <Accordion.Body>
                <p>To generate tagged URLs (non-generic), you must fill these fields:</p>
                <ListGroup className="mb-3">
                  <ListGroup.Item>
                    <strong>Date:</strong> The live/launch date of your campaign
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Project Name:</strong> The campaign name or code (e.g., CADCAM, Loyalty)
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Job Number:</strong> Format must be ##LL#### (e.g., 24DS2828 where DS = division code)
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Division:</strong> Select the target division (Dental, Medical, Insource, etc.)
                  </ListGroup.Item>
                </ListGroup>
                <p className="mb-0 small text-muted">
                  <strong>Note:</strong> Generic (untagged) URLs will generate with just the base URL filled.
                </p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>Can I generate untagged (Generic) URLs?</Accordion.Header>
              <Accordion.Body>
                <p>
                  Yes! <strong>Generic URLs</strong> are untagged versions of your links. They generate with just the base page URL filled in, 
                  making them useful for:
                </p>
                <ul>
                  <li>Direct links when GA4 tracking isn't needed</li>
                  <li>Internal references</li>
                  <li>Testing before applying UTM parameters</li>
                </ul>
                <p className="mb-0">
                  Generic URLs still include item codes, promo codes, and pricing settings if you fill those in.
                </p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>How do I format Item Codes correctly?</Accordion.Header>
              <Accordion.Body>
                <p>Item codes must be <strong>7-digit numbers separated by commas</strong>.</p>
                <div className="bg-light p-2 rounded mb-3 font-monospace small">
                  ✓ Correct: 5702440,1126402,1126403
                </div>
                <div className="bg-danger bg-opacity-10 p-2 rounded mb-3 font-monospace small">
                  ✗ Incorrect: 570244,112640 (not 7 digits)
                </div>
                <p className="mb-0">
                  For <strong>GEP</strong>, codes are automatically formatted in the URL path. For <strong>OneWeb</strong>, they're added as the productid parameter.
                </p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>What's the correct Job Number format?</Accordion.Header>
              <Accordion.Body>
                <p>Job Numbers must follow the pattern: <strong>##LL####</strong></p>
                <div className="bg-light p-3 rounded mb-3">
                  <p className="mb-2">Where:</p>
                  <ul className="mb-0">
                    <li><strong>#</strong> = Digit (0-9)</li>
                    <li><strong>L</strong> = Letter (A-Z)</li>
                  </ul>
                </div>
                <div className="bg-light p-2 rounded mb-3 font-monospace small">
                  ✓ Correct: 24DS2828, 25MS1001, 26CC5555
                </div>
                <div className="bg-danger bg-opacity-10 p-2 rounded mb-3 font-monospace small">
                  ✗ Incorrect: 2828 (no year or division), DS2882 (missing the year)
                </div>
                <p className="mb-0 small">
                  The two-letter code (LL) typically represents your division abbreviation (DS = Dental, MS = Medical, etc. GEP introduces further codes, such as 25DSMultichannel - which specifies that it's a multichannel campaign.)
                </p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header>What are all the marketing channel categories?</Accordion.Header>
              <Accordion.Body>
                <div className="table-responsive">
                  <table className="table table-sm table-bordered">
                    <thead>
                      <tr className="bg-light">
                        <th>Category</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><strong>Paid Search Ads</strong></td>
                        <td>Google Ads and Bing search campaigns</td>
                      </tr>
                      <tr>
                        <td><strong>Email</strong></td>
                        <td>Marketo SCS and MKtg email campaigns with multiple CTAs</td>
                      </tr>
                      <tr>
                        <td><strong>Email Featured Banner</strong></td>
                        <td>Specialized featured banner email campaigns</td>
                      </tr>
                      <tr>
                        <td><strong>Paid Display Ads</strong></td>
                        <td>AdRoll, AdAdvance, and RichRelevance display networks</td>
                      </tr>
                      <tr>
                        <td><strong>Narvar</strong></td>
                        <td>Post-purchase communications via website and email</td>
                      </tr>
                      <tr>
                        <td><strong>Social</strong></td>
                        <td>Meta (Facebook/Instagram), Twitter, YouTube, LinkedIn</td>
                      </tr>
                      <tr>
                        <td><strong>Website Linking Agreement</strong></td>
                        <td>Third-party vendor website links</td>
                      </tr>
                      <tr>
                        <td><strong>Trade Publication</strong></td>
                        <td>Industry publication email and website placements</td>
                      </tr>
                      <tr>
                        <td><strong>Vanity URLs</strong></td>
                        <td>Custom short URLs (external sources)</td>
                      </tr>
                      <tr>
                        <td><strong>QR Code</strong></td>
                        <td>QR code links for Nxtbook and external sources</td>
                      </tr>
                      <tr>
                        <td><strong>Telesales</strong></td>
                        <td>Phone-based sales team tracking</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="7">
              <Accordion.Header>What is a Marketo Folder Name and when is it required?</Accordion.Header>
              <Accordion.Body>
                <p>
                  <strong>Marketo Folder Names</strong> are required for email campaigns. They replace the standard UTM campaign parameter 
                  and provide more granular tracking within Marketo.
                </p>
                <p>Required for:</p>
                <ul>
                  <li>Email campaigns (MarketoSCS, MarketoMktg)</li>
                  <li>Email Featured Banner campaigns</li>
                </ul>
                <div className="bg-light p-2 rounded font-monospace small mb-3">
                  Example: EM-20240710-MedicomSterilization-12097-FL-DNTL
                </div>
                <p className="mb-0 small">
                  Format typically includes: EM-[Date]-[Campaign]-[ID]-[State]-[Division]
                </p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="8">
              <Accordion.Header>How do I use QR Codes with this tool?</Accordion.Header>
              <Accordion.Body>
                <p>
                  QR Code links require you to specify the <strong>QR Code Content</strong>, which is what the QR code will represent 
                  (usually a product name or category).
                </p>
                <p>Supported QR sources:</p>
                <ul>
                  <li><strong>Nxtbook:</strong> For digital publication QR codes</li>
                  <li><strong>External:</strong> For other QR code sources</li>
                </ul>
                <div className="bg-light p-2 rounded mb-3">
                  <p className="mb-2 small"><strong>Example content values:</strong></p>
                  <code className="small">Alloys, Implants, Sterilization, Supplies</code>
                </div>
                <p className="mb-0 small text-muted">
                  Tip: Use <a href="https://new.express.adobe.com/tools/generate-qr-code" target="_blank" rel="noopener noreferrer">
                  Adobe's QR Code Generator</a> to create the actual QR codes with these URLs.
                </p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="9">
              <Accordion.Header>Can I parse already-tagged URLs?</Accordion.Header>
              <Accordion.Body>
                <p>
                  Yes! You can paste an already-tagged URL into the <strong>Page URL field</strong>, and the tool will automatically 
                  extract and populate the relevant fields.
                </p>
                <p>Supported parameters for auto-population:</p>
                <ul>
                  <li><code>productid</code> - Item codes</li>
                  <li><code>promocode</code> - Promo codes (OneWeb)</li>
                  <li><code>dp</code> - Pricing parameter (OneWeb)</li>
                  <li><code>cdivid</code> - Division</li>
                  <li><code>utm_campaign</code> - Date, Project, and Job Number</li>
                </ul>
                <p className="mb-0 small text-muted">
                  The tool will extract these values and populate the form fields accordingly, saving you time.
                </p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="10">
              <Accordion.Header>What optional fields can I fill?</Accordion.Header>
              <Accordion.Body>
                <p>Beyond the required GA4 fields, you can optionally fill:</p>
                <ListGroup>
                  <ListGroup.Item>
                    <strong>Item Codes:</strong> 7-digit product codes (comma-separated)
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Promo Code:</strong> OneWeb only, typically 3 characters
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Keyword:</strong> Link name, ad type, or supplier name
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Vanity URL:</strong> Custom short URL (e.g., henryscheindigital.com/25Colgate)
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Vendor Name:</strong> For Website Linking Agreement channels
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Trade Publication Name & Link:</strong> For publication-based campaigns
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="11">
              <Accordion.Header>How do I copy and use the generated URLs?</Accordion.Header>
              <Accordion.Body>
                <p>You have several options:</p>
                <ol>
                  <li>
                    <strong>Copy All:</strong> Click the "Copy All" button to copy all generated URLs and paste into your campaign tools
                  </li>
                  <li>
                    <strong>Copy Individual:</strong> Click the "Copy" button on each URL to copy just that one
                  </li>
                  <li>
                    <strong>Click URL:</strong> Click directly on any URL to copy it to your clipboard
                  </li>
                </ol>
                <p className="mb-0">
                  URLs are copied with their category and name labels, making it easy to identify which channel each URL is for.
                </p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="12">
              <Accordion.Header>What should I know about URL structure and best practices?</Accordion.Header>
              <Accordion.Body>
                <p>Best practices for using generated URLs:</p>
                <ul>
                  <li>
                    <strong>Consistency:</strong> Use the same Job Number, Project, and Date for all URLs in a single campaign
                  </li>
                  <li>
                    <strong>Testing:</strong> Test one URL first to ensure it works before deploying all URLs
                  </li>
                  <li>
                    <strong>Documentation:</strong> Keep a record of your campaign details (date, project, job number) for future reference
                  </li>
                  <li>
                    <strong>Channel Alignment:</strong> Use the appropriate channel URL for each marketing channel
                  </li>
                  <li>
                    <strong>GA4 Review:</strong> Monitor your GA4 dashboard to ensure UTM parameters are tracking correctly
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="13">
              <Accordion.Header>What if I encounter an error?</Accordion.Header>
              <Accordion.Body>
                <p>
                  <strong>Error Messages:</strong> The tool validates input as you type and shows helpful error messages for:
                </p>
                <ul>
                  <li>Invalid URL format</li>
                  <li>Item codes not 7 digits</li>
                  <li>Job Number format incorrect</li>
                  <li>Promo codes over 3 characters</li>
                </ul>
                <p><strong>If URLs aren't generating:</strong></p>
                <ul>
                  <li>Ensure Page URL is filled (always required)</li>
                  <li>For GA4-tagged URLs, fill Date, Project, Job Number, and Division</li>
                  <li>Check that at least one channel category is selected in the Filters</li>
                  <li>For Email, ensure Marketo Folder Name is filled</li>
                  <li>For QR Code, ensure QR Code Content is filled</li>
                </ul>
                <p className="mb-0 small">
                  Need more help? Contact your marketing operations team or check with your administrator.
                </p>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="14">
              <Accordion.Header>Where can I learn more about GA4?</Accordion.Header>
              <Accordion.Body>
                <p>For detailed GA4 information, visit:</p>
                <ul>
                  <li>
                    <a href="https://support.google.com/analytics/answer/10917952" target="_blank" rel="noopener noreferrer">
                      Google Analytics 4 Help Center - UTM Parameters
                    </a>
                  </li>
                  <li>
                    <a href="https://support.google.com/analytics" target="_blank" rel="noopener noreferrer">
                      Google Analytics Support
                    </a>
                  </li>
                </ul>
                <p className="mb-0 small text-muted">
                  These resources provide comprehensive documentation on setting up and using GA4 effectively.
                </p>
              </Accordion.Body>
            </Accordion.Item>

          </Accordion>

          {/* Important Notes */}
          <div className="mt-4 p-3 border-start border-warning bg-warning bg-opacity-10 rounded">
            <h6 className="fw-bold text-warning mb-2 d-flex align-items-center gap-2">
              <FaExclamationTriangle /> Important Reminders
            </h6>
            <ul className="small mb-0">
              <li>Always double-check your URLs before deploying to live campaigns</li>
              <li>Maintain consistent Job Number formatting across campaigns for better analytics</li>
              <li>Test URLs in your target environment before full deployment</li>
              <li>Keep campaign documentation for future reference and auditing</li>
              <li>Monitor GA4 dashboard after campaign launch to verify tracking is working</li>
            </ul>
          </div>
        </Container>
      </Modal.Body>

      <Modal.Footer className="bg-light border-top-2">
        <button className="btn btn-primary" onClick={onHide}>
          Close Help
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default HelpModal;