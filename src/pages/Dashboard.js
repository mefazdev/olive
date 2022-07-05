import React, { useEffect, useState } from "react";
import Featur from "../components/Featur";
import "../style/css/dashboard.css";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { onAuthStateChanged } from "firebase/auth";
 
import { auth } from "../firebase";
 
import { Button, Toast  } from "react-bootstrap";
import userEvent from "@testing-library/user-event";
 

function MyOrder() {
const [user,setUser] = useState({})
const [toast, setToast] = useState(false)
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });


 const openToast = ()=>{
  if(!user){
    setToast(true)
  }
 }
 useEffect(()=>{
  openToast()
 },[user])
  return (
    <>
      <Header />
      <Toast
      //  onClose={()=>setTaost1(false)}
       show={toast}
       delay={3000}
       autohide  
       id='toast1' 
      
        >
           
          <Toast.Body>
          Please login to view your dashboard
          <Button
          id='toast1__btn'
          onClick={()=>setToast(false)}
          style={{ marginLeft: "10px", }}>OK</Button>
          </Toast.Body>
        </Toast>

        <div className="container">
        <div className="body">
          <div className="dashboard-container ">
            
            {user ? <>
            <div className="path ">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <p>Home </p>
            </Link>
            <ArrowForwardIosIcon id="path__icon" />
            <Link
              to="dashboard"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <p>Dashboard</p>
            </Link>
          </div>
          <div className="dashboard-title">
            <p>DASHBOARD</p>
          </div>
            <div className="box-container">
              <div className="row">
                <Row>
                  <Col md>
                    <Link
                      to="/allOrder"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        className="dashboard-box"
                        style={{
                          background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                        }}
                      >
                        <p>My Orders</p>
                        <img
                          className="dashboard-img1"
                          src={process.env.PUBLIC_URL + "/images/imoji01.svg"}
                          alt="my order"
                        />
                      </div>
                    </Link>
                  </Col>
                  <Col md>
                    <Link
                      to="/bookMark"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        className="dashboard-box"
                        style={{
                          background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                        }}
                      >
                        <p>Bookmark</p>
                        <img
                          className="dashboard-img2"
                          src={process.env.PUBLIC_URL + "/images/imoji02.svg"}
                          alt="bookmark"
                        />
                      </div>
                    </Link>
                  </Col>
                  <Col md>
                    <Link
                      to="/address"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        className="dashboard-box"
                        style={{
                          background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                        }}
                      >
                        <p>Address</p>
                        <img
                          className="dashboard-img3"
                          src={process.env.PUBLIC_URL + "/images/imoji03.svg"}
                          alt="address"
                        />
                      </div>
                    </Link>
                  </Col>
                </Row>

                <Row>
                  <Col md>
                    <Link
                      to="/"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        className="dashboard-box"
                        style={{
                          background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                        }}
                      >
                        <p>Profile</p>
                        <img
                          className="dashboard-img4"
                          src={process.env.PUBLIC_URL + "/images/imoji04.svg"}
                          alt="profile"
                        />
                      </div>
                    </Link>
                  </Col>
                  <Col md>
                    <Link
                      to="/"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        className="dashboard-box"
                        style={{
                          background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                        }}
                      >
                        <p>Support</p>
                        <img
                          className="dashboard-img5"
                          src={process.env.PUBLIC_URL + "/images/imoji05.svg"}
                          alt="support"
                        />
                      </div>
                    </Link>
                  </Col>
                  <Col md>
                    <Link
                      to="/"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        className="dashboard-box"
                        style={{
                          background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                        }}
                      >
                        <p>Password</p>
                        <img
                          className="dashboard-img6"
                          src={process.env.PUBLIC_URL + "/images/imoji06.svg"}
                          alt="password"
                        />
                      </div>
                    </Link>
                  </Col>
                </Row>
              </div>
            </div> </> : ''}
            
          </div>
        </div>
        <Featur />
      </div> 
      <Footer /> 
    </>
  );
}

export default MyOrder;
