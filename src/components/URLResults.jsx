import React from 'react';

const URLItem = ({ urlObj }) => (
  <div className="mb-3">
    <h6 className="text-secondary">{urlObj.name}</h6>
    <a
      href={urlObj.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-break url-link"
    >
      {urlObj.url}
    </a>
  </div>
);

const URLCategory = ({ group }) => (
  <div className="mb-4">
    <h5 className="text-primary-dark url-category-title pb-2">
      {group.category}
    </h5>
    {group.urls.map((urlObj, idx) => (
      <URLItem key={idx} urlObj={urlObj} />
    ))}
  </div>
);

const URLResults = ({ urls, onCopyAll }) => (
  <div className="mt-4">
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h4 className="text-primary-dark mb-0">Generated URLs</h4>
      <button className="btn btn-primary" onClick={onCopyAll}>Copy All</button>
    </div>
    <div className="card">
      <div className="card-body url-results-body">
        {urls.map((group, idx) => (
          <URLCategory key={idx} group={group} />
        ))}
      </div>
    </div>
  </div>
);

export default URLResults;