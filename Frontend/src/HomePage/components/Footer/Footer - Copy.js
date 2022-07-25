import React from "react";

import Button from "../../../shared/components/UI/Button/Button";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="container">
          <div className="footer-links-top">
            <Button element="link" to="/">
              Questions? Contact us.
            </Button>
          </div>
          <ul className="footer-links">
            <div className="col-1">
              <li className="footer-link-item">
                <Button element="link" to="/">
                  FAQ
                </Button>
              </li>
              <li className="footer-link-item">
                <Button element="link" to="/">
                  Investor Relations
                </Button>
              </li>
              <li className="footer-link-item">
                <Button element="link" to="/">
                  Privacy
                </Button>
              </li>
              <li className="footer-link-item">
                <Button element="link" to="/">
                  Speed Test
                </Button>
              </li>
            </div>
            <div className="col-2">
              <li className="footer-link-item">
                <Button element="link" to="/">
                  Help Center
                </Button>
              </li>
              <li className="footer-link-item">
                <Button element="link" to="/">
                  Jobs
                </Button>
              </li>
              <li className="footer-link-item">
                <Button element="link" to="/">
                  Cookie Preferences
                </Button>
              </li>
              <li className="footer-link-item">
                <Button element="link" to="/">
                  Legal Notices
                </Button>
              </li>
            </div>
            <div className="col-3">
              <li className="footer-link-item">
                <Button element="link" to="/">
                  Account
                </Button>
              </li>
              <li className="footer-link-item">
                <Button element="link" to="/">
                  Ways to Watch
                </Button>
              </li>
              <li className="footer-link-item">
                <Button element="link" to="/">
                  Corporate Information
                </Button>
              </li>
              <li className="footer-link-item">
                <Button element="link" to="/">
                  Only on Netflix
                </Button>
              </li>
            </div>
            <div className="col-4">
              <li className="footer-link-item">
                <Button element="link" to="/">
                  Media Center
                </Button>
              </li>
              <li className="footer-link-item">
                <Button element="link" to="/">
                  Terms of Use
                </Button>
              </li>
              <li className="footer-link-item">
                <Button element="link" to="/">
                  Contact Us
                </Button>
              </li>
            </div>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
