import React from "react";
import "./footer.css";
import { FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <div className="footer__wrapper_icon">
          <FaPhone size="1rem" /> 
        </div>
        <div>
          +7 929 703 93 **
        </div>
      </div>
      <div className="footer__sign">
        made by Sergey Tikhonov FR 1010
      </div> 
    </footer>
  );
};

export default Footer;