import React from 'react';

const UpdatesSidebar = ({ show, onToggle }) => (
  <div className={`updates-sidebar ${show ? 'updates-sidebar-open' : ''}`}>
    <div className="updates-toggle" onClick={onToggle}>
      <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="#FFFFFF">
        <path d="M12 2C10.34 2 9 3.34 9 5v1.07C6.27 6.56 4.5 8.79 4.5 11.5v4.79L3 18.79V20h18v-1.21l-1.5-2.5v-4.79c0-2.71-1.77-4.94-4.5-5.43V5c0-1.66-1.34-3-3-3zm0 18c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2zM8.12 17l.88-1.47h6l.88 1.47H8.12z"/>
      </svg>
    </div>
    {show && (
      <div className="updates-content">
        <h6 className="mb-3">Tool Updates</h6>
        <div className="updates-list">
          <div className="mb-3">
            <div className="d-flex align-items-start">
              <div className="update-avatar"></div>
              <div className="update-message flex-grow-1">
                <strong>Trevor Smith</strong>
                <div className="update-date">2024-12-04</div>
                <p className="update-text">
                  Bug fixes with the email URL generation, specifically the "?" and "&" constructed improperly.
                </p>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div className="d-flex align-items-start">
              <div className="update-avatar"></div>
              <div className="update-message flex-grow-1">
                <strong>Trevor Smith</strong>
                <div className="update-date">2024-10-19</div>
                <p className="update-text">
                  Added error detection in the Page URL, Item Codes, Promo Code, and Job Number fields.
                </p>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div className="d-flex align-items-start">
              <div className="update-avatar"></div>
              <div className="update-message flex-grow-1">
                <strong>Trevor Smith</strong>
                <div className="update-date">2024-10-16</div>
                <p className="update-text">
                  Updates to UI and parsing functionality. utm_campaign is now able to be reverse-parsed.
                </p>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div className="d-flex align-items-start">
              <div className="update-avatar"></div>
              <div className="update-message flex-grow-1">
                <strong>Trevor Smith</strong>
                <div className="update-date">2024-10-15</div>
                <p className="update-text">
                  Added new responsive layout for tools. Added ability to parse already-tagged URLs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default UpdatesSidebar;