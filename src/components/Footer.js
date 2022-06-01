import React from "react";
import "../style/css/footer.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import SendIcon from "@material-ui/icons/Send";
import { Link } from "react-router-dom";
function footer() {
  return (
    <div className="footer ">
      <div className="footer__row container">
        <Row>
          <Col md>
            <Row>
              <Col xs="6">
                <div className="footer__div">
                  <h6>About</h6>
                  <Link
                    to="/about"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <p>Company</p>
                  </Link>

                  <p>Site Map</p>
                  <p>Our Team</p>
                  <p>Our Mission</p>
                </div>
              </Col>
              <Col xs="6">
                <div className="footer__div">
                  <h6>Help</h6>
                  <p>Help Center</p>
                  <p>Returns</p>
                  <p>Accessibilty</p>
                  <p>Product Recalls</p>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md>
            <Row>
              <Col xs="6">
                <div className="footer__div">
                  <h6>Policy</h6>
                  <p>Terms of use</p>
                  <p>Privacy</p>
                  <p>Security</p>
                </div>
              </Col>
              <Col xs="6">
                <div className="footer__contact">
                  <h6>Contact Us</h6>

                  <h5>
                    Koyappathodi Plaza, East Nadakkave, Kozhikode, Kerala 673011
                  </h5>
                  <p>Phone: 9846 987654</p>
                  <p>Email: info@olivebooks.com</p>
                  <p>Open Hours: 9AM to 5PM</p>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md="3">
            <div className="footer_form">
              <h6>Join our newsletter</h6>
              <p>
                Signup to be the first to hear about exclusive deals, special
                offers and upcoming collections
              </p>

              <div className="form__input__div">
                <input placeholder="Enter email address" type="email" />
                <div className="footer__icon__div">
                  <SendIcon type="button" id="footer__icon" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="developed">
        <div>
          <h5>Copyright 2021 | Crafted with Clever Kings</h5>
        </div>
      </div>
    </div>
  );
}

export default footer;
