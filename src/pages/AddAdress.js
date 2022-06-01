import React from "react";
import Featur from "../components/Featur";
import "../style/css/addAdress.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
function AddAddress() {
  return (
    <div className=" container">
      <div className="container1">
        <div className="path" style={{ marginLeft: "-10px" }}>
          <p>Home </p>
          <ArrowForwardIosIcon id="path__icon" />
          <p>Dashboard </p>
          <ArrowForwardIosIcon id="path__icon" />
          <p>Address</p>
        </div>

        <div className="address__details">
          <Row>
            <Col md>
              <div
                className="data-container"
                style={{
                  background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                }}
              >
                <div className="name-header">
                  <div className="name-container">
                    <p className="name">Joseph P</p>
                  </div>
                  <div className="icon-container">
                    <Link
                      to="/editAdress"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <img
                        className="edit-icon"
                        src={process.env.PUBLIC_URL + "/images/edit_icon.png"}
                        alt="edit-icon"
                      />
                    </Link>

                    <a href="#">
                      <img
                        className="delete-icon"
                        src={process.env.PUBLIC_URL + "/images/delete_icon.png"}
                        alt="delete-icon"
                      />
                    </a>
                  </div>
                </div>
                <div className="data-box">
                  <p className="data">House No: 12,</p>
                  <p className="data">Palayam </p>
                  <p className="data">Road,</p>
                  <p className="data">Kozhikod</p>
                  <p className="data">Kerala</p>
                  <p className="data">India, 6703001</p>
                </div>
              </div>
            </Col>
            <Col md>
              <div
                className="add-container"
                style={{
                  background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                }}
              >
                <a href="#">
                  <img
                    className="add-image"
                    src={process.env.PUBLIC_URL + "/images/add.png"}
                    alt="add-icon"
                  />
                </a>
                <p>ADD ADDRESS</p>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <Featur />
    </div>
  );
}

export default AddAddress;
