import React, { useEffect, useState } from "react";
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
import { onAuthStateChanged } from "firebase/auth";
import Login from "../components/Login";
import Signup from "./Signup";
import { useStateValue } from "../stateProvider";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  getDocs,
  doc,
  serverTimestamp,
  deleteDoc,
  updateDoc,
  where,
  getDoc,
} from "@firebase/firestore";
import HeaderSearch from "./HeaderSearch";
import { Button, Col, Row, Toast } from "react-bootstrap";
import { CardTravelOutlined } from "@material-ui/icons";
function Header() {
  const [{ signupModal, basket, loginModal,openToast }, dispatch] = useStateValue();
  // const [{basket,signupModal}] = useStateValue();
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);


 const [cart, setCart] = useState([])
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const closeToast = ()=>{
    dispatch({
      type:"HIDE__TOAST"
    })
  }
  const fetchData = async () => {
     if (user){
      const q = await query(collection(db,"cart"),where('userId', '==', user?.uid ));
      onSnapshot(q, (snapshot) => {
        setCart(snapshot.docs.map((doc) => doc));
  
      
      });
     }
       
     
  
    
  };
  useEffect (()=>{
    fetchData()
  },[user])
  const checkActive = (match, location) => {
    //some additional logic to verify you are in the home URI
    if (!location) return false;
    const { pathname } = location;
    // console.log(pathname);
    return pathname === "/";
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const openLogin = () => {
    
    dispatch({
      type: "OPEN__LOGIN__MODAL",
      signinModal: true,
    });
  };
  const closeLogin = () => {
    dispatch({
      type: "CLOSE__LOGIN__MODAL",
      loginModal: false,
    });
  };

  const closeSignUp = () => {
    dispatch({
      type: "CLOSE__SIGNUP__MODAL",
      signupModal: false,
    });
  };

  return (
    <div className="header">
      <div className="header__section__one ">
        {/* <button onClick={()=>console.log("HHE>>>0",)}>HELLOOO</button> */}
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
              <HeaderSearch/>
                {/* <div className="header__input__div">
                  <span className="header__serach__p">
                    <p>All Categories</p>
                  </span>
                  <input
                    type="text"
                    placeholder="Search for books by key word"
                  />
                  <Link to="/search">
                    <span className="header__serach__span">
                      <SearchIcon />
                    </span>
                  </Link>
                </div> */}
              </div>
              <Link
                to="/cart"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="shoppinCart__icon__div">
                  <div id="shoppinCart__span">{cart.length}</div>
                  <ShoppingCartOutlinedIcon id="shoppinCart__icon" />
                </div>
              </Link>
            </div>

            <div className="header_first__row__right ">
              <div className="header__login">
                <Link to='/dashboard' style={{textDecoration:'none',color:'inherit'}}>
                
                <div className="header__account__div">
                  <PermIdentityIcon
                    // onClick={}
                    id="login__icon"
                  />
                  <h5>
                    {user   && user.email ? user.email.slice(0, 5) : ""}
                    {/* My Account */}
                  </h5>
                </div>
                </Link>
                <div
                  className="header__login__div"
                  onClick={user ? logOut : openLogin}
                >
                  <h6>{!user ? "Sign In" : "Sign Out"} </h6>
                  {/* <h5>
                    {user?.email }
                   
                  </h5> */}
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
                    <h5>{cart.length} Items</h5>
                  </div>
                </Link>

                {/* <p onClick={logOut}>Lpgout</p> */}
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
            <NavLink to="/ " activeClassName="nav__active" id="navLink">
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
              <Link to='/dashboard' style={{textDecoration:'none',color:'inherit'}}><PermIdentityIcon
                id="collpase__login__icon"
                // onClick={openLogin}
              /></Link>
              {/* <p
              onClick={user ? logOut : openLogin}
              >{!user ? "Sign In" : "Sign Out"} </p> */}
              <p
              onClick={user ? logOut : openLogin}
              >{!user ? "Sign In" : "Sign Out"} </p>
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
          <NavLink
            to="/dashboard"
            activeClassName="nav__active__collapse"
            a
            id="navLink"
            onClick={() => setOpen(!open)}
          >
            <h6>DASHBOARD</h6>
          </NavLink>
        </div>
      </Collapse>

      {/*<<<<<<<<<<<<<<<<<<<<<<<< SIGN UP MODAL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Modal
        show={signupModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={closeSignUp}></Modal.Header>
        <Modal.Body id="signup-model">
          <Signup />
        </Modal.Body>
      </Modal>

      {/* <<<<<<<<<<<<<< LOGIN MODAL >>>>>>>>>>>>>>>>>>>>>>> */}
      <Modal
        show={loginModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={closeLogin}></Modal.Header>
        <Modal.Body id="signup-model">
          <Login />
        </Modal.Body>
      </Modal>
{/* 
      <Row>
      <Col xs={6}> */}
      <div className="toster">
        <Toast
        
        onClose={closeToast} show={openToast ? openToast:false} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Olive Books</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body>Item added to your cart
            <Link to='cart'><Button style={{marginLeft:'10px'}}>View</Button></Link>
            
          </Toast.Body>
        </Toast>
        </div>
      {/* </Col> */}
      {/* <Col xs={6}>
        <Button onClick={() => setShow(true)}>Show Toast</Button>
      </Col> */}
    {/* </Row> */}
    </div>
  );
}

export default Header;
