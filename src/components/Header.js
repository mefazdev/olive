import React, { useState } from "react";
import "../style/css/header.css";
import logo from "../images/logo.png";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Collapse from "react-bootstrap/Collapse";
import { Link, NavLink } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "./signup.css";
import "./login.css";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MenuSharpIcon from "@material-ui/icons/MenuSharp";
// import Fade from 'react-bootstrap/Fade'
function Header() {
  const [user, setUser] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginupModal] = useState(false);

  const checkActive = (match, location) => {
    //some additional logic to verify you are in the home URI
    if (!location) return false;
    const { pathname } = location;
    console.log(pathname);
    return pathname === "/";
  };
  return (
    <div className="header">
      <div className="header__section__one ">
        <div className="  header_first__row container">
          <div className="  header_first__row__div">
            <MenuSharpIcon
              onClick={() => setOpen(!open)}
              id="header__list__icon"
            />

            <div className="header__logo__div ">
              <div className="logo__input">
                <Link to="/" id="logo__link">
                  <img className="header__logo " src={logo} alt="logo" />
                </Link>

                <div className="header__input__div">
                  <span className="header__serach__p">
                    <p>All Categories</p>
                  </span>
                  <input
                    type="text"
                    placeholder="Search for books by key word"
                  />
                  <Link to="/search">
                    <span className="header__serach__span">
                      <SearchIcon  />
                    </span>
                  </Link>
                </div>
              </div>
              <Link
                to="/cart"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="shoppinCart__icon__div">
                  <div id="shoppinCart__span">2</div>
                  <ShoppingCartOutlinedIcon id="shoppinCart__icon" />
                </div>
              </Link>
            </div>

            <div className="header_first__row__right ">
              <div className="header__login">
                <PermIdentityIcon
                  onClick={() => setShowLoginupModal(true)}
                  
                  id="login__icon"
                />
                <div
                  className="header__login__div"
                  onClick={() => setShowLoginupModal(true)}
                >
                  <h6>{user ? "Sign Out" : "Sign In"} </h6>
                  <h5>My Account</h5>
                </div>
              </div>

              <div className="header__login">
                <Link
                  to="/cart"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ShoppingCartOutlinedIcon id="login__icon" />
                </Link>

                <Link
                  to="/cart"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="header__login__div">
                    <h6>My Cart</h6>
                    <h5>3 Items</h5>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header__second__row ">
        <div className="navbars container">
          <div className="nav__items">
            <NavLink
              strict
              to="/"
              isActive={checkActive}
              activeClassName="nav__active"
              id="navLink"
            >
              <h5>Home</h5>
            </NavLink>
            <NavLink
              strict
              to="/categories"
              activeClassName="nav__active"
              id="navLink"
            >
              <h5>Categories</h5>
            </NavLink>
            <NavLink to="/preorder" activeClassName="nav__active" id="navLink">
              <h5>Pre-order</h5>
            </NavLink>
            <NavLink to="/error" activeClassName="nav__active" id="navLink">
              <h5>Languages</h5>
            </NavLink>
            <NavLink to="/error" activeClassName="nav__active" id="navLink">
              <h5>IMPRINTs</h5>
            </NavLink>

            <NavLink to="/error" activeClassName="nav__active" id="navLink">
              <h5>Web magazine</h5>
            </NavLink>
            <NavLink to="/authors" activeClassName="nav__active" id="navLink">
              <h5>Authors List</h5>
            </NavLink>
            <NavLink to="/offerZone" activeClassName="nav__active" id="navLink">
              <h5>OFFERSZONE</h5>
            </NavLink>
          </div>
        </div>
      </div>


{/* <<<<<<<<<<<<<<<<<<< NAVBAR COLLAPSE >>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Collapse in={open}>
        <div className="navbar__collpase">
          <div className="collpse__first__row">
            <NavLink
              strict
              to="/"
              isActive={checkActive}
              activeClassName="nav__active__collapse"
              id="navLink"
              onClick={() => setOpen(!open)}
            >
              <h6>Home</h6>
            </NavLink>
            <div
              className="collpase__login"
              type="button"
              onClick={() => setOpen(!open)}
            >
              <PermIdentityIcon
                id="collpase__login__icon"
                onClick={() => setShowLoginupModal(true)}
              />
              <p>{user ? "Sign Out" : "Sign In"} </p>
            </div>
          </div>

          <NavLink
            strict
            to="/categories"
            activeClassName="nav__active__collapse"
            id="navLink"
            onClick={() => setOpen(!open)}
          >
            <h6>Categories</h6>
          </NavLink>
          <NavLink
            to="/preorder"
            activeClassName="nav__active__collapse"
            id="navLink"
            onClick={() => setOpen(!open)}
          >
            <h6>Pre-order</h6>
          </NavLink>
          <NavLink
            to="/error"
            activeClassName="nav__active__collapse"
            id="navLink"
            onClick={() => setOpen(!open)}
          >
            <h6>Languages</h6>
          </NavLink>
          <NavLink
            to="/error"
            id="navLink"
            activeClassName="nav__active__collapse"
            onClick={() => setOpen(!open)}
          >
            <h6>IMPRINTs</h6>
          </NavLink>

          <NavLink
            to="/error"
            id="navLink"
            activeClassName="nav__active__collapse"
            onClick={() => setOpen(!open)}
          >
            <h6>Web magazine</h6>
          </NavLink>
          <NavLink
            activeClassName="nav__active__collapse"
            to="/authors"
           
            id="navLink"
            onClick={() => setOpen(!open)}
          >
            <h6>Authors List</h6>
          </NavLink>
          <NavLink
            to="/offerZone"
            activeClassName="nav__active__collapse"
            a
            id="navLink"
            onClick={() => setOpen(!open)}
          >
            <h6>OFFERSZONE</h6>
          </NavLink>
        </div>
      </Collapse>

      {/*<<<<<<<<<<<<<<<<<<<<<<<< SIGN UP MODAL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Modal
        show={showSignupModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          onClick={() => setShowSignupModal(false)}
        ></Modal.Header>
        <Modal.Body id="signup-model">
          <div className="body">
            <div className="container2">
              <div className="left">
                <img
                  className="signup-img"
                  src={process.env.PUBLIC_URL + "/images/signup.png"}
                  alt="edit-icon"
                />
              </div>
              <div className="right">
                <img
                  className="logo-img2"
                  src={process.env.PUBLIC_URL + "/images/signup03.png"}
                  alt="edit-icon"
                />
                <div className="form-container">
                  <input
                    className="input"
                    type="text"
                    placeholder="  Name"
                    name="name"
                  />
                  <br></br>
                  <input
                    className="input"
                    type="email"
                    placeholder="  Email ID"
                    name="email"
                  />
                  <br></br>
                  <input
                    className="input"
                    type="password"
                    placeholder="  Password"
                    name="password"
                  />
                  <button className="signup-btn" type="button">
                    SIGN UP
                  </button>
                </div>

                <div className="link-container">
                  <p className="have-account" type="button">
                    Already have an account ?{" "}
                    <span onClick={() => setShowSignupModal(false)}>
                      {" "}
                      <a onClick={() => setShowLoginupModal(true)}>LOGIN NOW</a>
                    </span>
                  </p>
                  <p className="or-with">Or Login With</p>
                  <div className="social-container">
                    <div className="icon-google">
                      <a href="#">
                        <img
                          className="social-icon"
                          src={process.env.PUBLIC_URL + "/images/google.png"}
                          alt="edit-icon"
                        />
                      </a>
                    </div>
                    <div className="icon-fb">
                      <a href="#">
                        <img
                          className="social-icon"
                          src={process.env.PUBLIC_URL + "/images/fb.png"}
                          alt="edit-icon"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* <<<<<<<<<<<<<< LOGIN MODAL >>>>>>>>>>>>>>>>>>>>>>> */}
      <Modal
        show={showLoginModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          onClick={() => setShowLoginupModal(false)}
        ></Modal.Header>
        <Modal.Body id="signup-model">
          <div className="body">
            <div className="container2">
              <div className="left">
                <img
                  className="signup-img"
                  src={process.env.PUBLIC_URL + "/images/signup.png"}
                  alt="edit-icon"
                />
              </div>
              <div className="right">
                <img
                  className="logo-img2"
                  src={process.env.PUBLIC_URL + "/images/signup04.png"}
                  alt="edit-icon"
                />
                <div className="text-containere">
                  <p className="login__text">
                    To review and adjust your security settings and get
                    recommendations to help you keep your
                  </p>
                </div>

                <div className="form-container2">
                  <input
                    className="log-input"
                    type="email"
                    placeholder="  Email ID"
                    name="email"
                  />
                  <br></br>
                  <input
                    className="log-input"
                    type="password"
                    placeholder="  Password"
                    name="password"
                  />
                  <div className="btn-container">
                    <p>
                      <a href="#">Forgot Password?</a>
                    </p>

                    <Link to="/address">
                      <button className="signin-btn" type="button">
                        LOGIN
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="link-container2">
                  <p className="have-account">
                    Don't have an account ?{" "}
                    <span onClick={() => setShowLoginupModal(false)}>
                      {" "}
                      <a type="button" onClick={() => setShowSignupModal(true)}>
                        SIGNUP NOW
                      </a>
                    </span>
                  </p>
                  <p className="or-with">Or Login With</p>
                  <div className="social-container">
                    <div className="icon-google">
                      <a href="#">
                        <img
                          className="social-icon"
                          src={process.env.PUBLIC_URL + "/images/google.png"}
                          alt="edit-icon"
                        />
                      </a>
                    </div>
                    <div className="icon-fb">
                      <a href="#">
                        <img
                          className="social-icon"
                          src={process.env.PUBLIC_URL + "/images/fb.png"}
                          alt="edit-icon"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Header;
