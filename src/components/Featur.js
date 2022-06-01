import "./../style/css/feature.css";
import icon1 from "../images/icons/icon1.png";
import icon2 from "../images/icons/icon2.png";
import icon3 from "../images/icons/icon3.png";
import icon4 from "../images/icons/icon4.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
function Featur() {
  return (
    <div>
      <div className="feature__row">
        <Row>
          <Col className="feature__col" xs="6" md="3">
            <img src={icon1} />
            <div className="feature__right">
              <h6>Free Delivery</h6>
              <p>Orders above ₹500</p>
            </div>
          </Col>

          <Col className="feature__col" xs="6" md="3">
            <img src={icon2} />
            <div className="feature__right">
              <h6>Secure Payments</h6>
              <p>Orders above ₹500</p>
            </div>
          </Col>
          <Col className="feature__col" xs="6" md="3">
            <img src={icon3} />
            <div className="feature__right">
              <h6>Easy Return</h6>
              <p>Orders above ₹500</p>
            </div>
          </Col>
          <Col className="feature__col" xs="6" md="3">
            <img className="col" src={icon4} />
            <div className="feature__right">
              <h6>Any time support</h6>
              <p>Orders above ₹500</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Featur;
