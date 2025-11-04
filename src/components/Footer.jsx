import React from "react";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="powered-by">Powered by</p>
      <div className="logo-wrap no-pad">
        <img
          align="center"
          className="invert"
          src="https://www.henryschein.com/us-en/images/logos/vendor/henryschein-logo.svg"
          alt="Henry Schein"
        />
      </div>
    </footer>
  );
};

export default Footer;
