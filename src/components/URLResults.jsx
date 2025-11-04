import React, { useState } from 'react';
import { Card, Alert, Container } from 'react-bootstrap';
import './URLResults.css';

const URLResults = ({ urls, onCopyAll }) => {
  const [allCopied, setAllCopied] = useState(false);
  const [copiedUrlIndex, setCopiedUrlIndex] = useState(null);

  const handleCopyAll = async () => {
    if (urls.length === 0) return;
    
    const text = urls.map(group => 
      `${group.category}\n${group.urls.map(u => `${u.name}: ${u.url}`).join('\n')}`
    ).join('\n\n');
    
    try {
      await navigator.clipboard.writeText(text);
      setAllCopied(true);
      setTimeout(() => setAllCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleCopyIndividual = async (urlText, index) => {
    try {
      await navigator.clipboard.writeText(urlText);
      setCopiedUrlIndex(index);
      setTimeout(() => setCopiedUrlIndex(null), 1500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const totalUrls = urls ? urls.reduce((total, group) => total + group.urls.length, 0) : 0;

  if (!urls || urls.length === 0) {
    return (
      <Container>
        <Card className="rounded-3 border-0 shadow-sm mb-5">
          <Card.Body className="p-4">
            <Alert variant="info">
              <div className="d-flex align-items-center">
                <i className="fas fa-info-circle me-2"></i>
                <div>
                  <strong>No URLs generated yet.</strong> The form is working but no URLs are being generated. Check the console for details.
                </div>
              </div>
            </Alert>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card className="rounded-3 border-0 shadow-sm mb-5">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="text-primary-dark mb-1 fw-bold">Generated URLs</h4>
              <p className="text-muted small mb-0">
                {urls.length} categories • {totalUrls} total URLs
              </p>
            </div>
            <button 
              className={`btn ${allCopied ? 'btn-success' : 'btn-primary'} d-flex align-items-center copy-all-btn`}
              onClick={handleCopyAll}
            >
              <i className={`fas ${allCopied ? 'fa-check' : 'fa-copy'} me-2 copy-icon`}></i>
              <span className="copy-text">{allCopied ? 'All Copied!' : 'Copy All'}</span>
            </button>
          </div>

          <div className="url-results-body">
            {urls.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="text-primary-dark fw-bold mb-0">
                    {group.category}
                  </h5>
                  <span className="badge bg-primary">{group.urls.length} URLs</span>
                </div>
                {group.urls.map((urlObj, urlIndex) => {
                  const globalIndex = `${groupIndex}-${urlIndex}`;
                  const isCopied = copiedUrlIndex === globalIndex;
                  
                  return (
                    <div key={urlIndex} className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="text-secondary small fw-semibold mb-0">{urlObj.name}</h6>
                        <button
                          onClick={() => handleCopyIndividual(urlObj.url, globalIndex)}
                          className={`btn btn-sm ${isCopied ? 'btn-success' : 'btn-outline-primary'} copy-btn`}
                          style={{ fontSize: '0.75rem' }}
                        >
                          <i className={`fas ${isCopied ? 'fa-check' : 'fa-copy'} me-1`}></i>
                          {isCopied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <div 
                        className="p-3 bg-light rounded border url-display"
                        style={{ 
                          fontSize: '0.8rem', 
                          wordBreak: 'break-all',
                          fontFamily: 'Monaco, Consolas, monospace',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleCopyIndividual(urlObj.url, globalIndex)}
                        title="Click to copy"
                      >
                        {urlObj.url}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default URLResults;