import React from 'react';

const Header = () => (
  <div className="text-center mb-4">
    <img 
      src="https://www.henryschein.com/us-en/images/logos/vendor/henryschein-logo.svg" 
      alt="Henry Schein" 
      className="header-logo"
    />
    <h1 className="mt-3 text-primary-dark">GA-Tagged URL Generator</h1>
    <p className="text-muted"><em>* denotes required field</em></p>
  </div>
);

export default Header;