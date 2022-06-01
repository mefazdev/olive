import "../style/css/bookMark.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SearchIcon from "@material-ui/icons/Search";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import best1 from "../images/author/best1.png";
import best2 from "../images/author/best2.png";
import best3 from "../images/author/best3.png";
import best4 from "../images/author/best4.png";
import { useState } from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import Featur from "../components/Featur";
import bookmark from "../images/bookmark/bookmark.png";

import UsePagination from "../components/Pagination";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
function BookMark() {
  const [show, setShow] = useState(false);
  const [item] = useState([
    {
      image: best1,
      name: "My family",
      author: "Mahadevi Varma  ",
      cutPrice: "654",
      price: "456",
    },
    {
      image: best2,
      name: "That night",
      author: "Nidhi Updhyay",
      cutPrice: "123",
      price: "321",
    },
    {
      image: best3,
      name: "The family firm",
      author: "Emily Oster",
      cutPrice: "777",
      price: "765",
    },
    {
      image: best4,
      name: "The best couple ever",
      author: "The best couple ever",
      cutPrice: "321",
      price: "321",
    },
    {
      image: best1,
      name: "My family",
      author: "Mahadevi Varma",
      cutPrice: "654",
      price: "456",
    },
    {
      image: best2,
      name: "That night",
      author: "Nidhi Updhyay",
      cutPrice: "123",
      price: "321",
    },
    {
      image: best3,
      name: "The family firm",
      author: "Emily Oster",
      cutPrice: "777",
      price: "765",
    },
    {
      image: best4,
      name: "The best couple ever",
      author: "The best couple ever",
      cutPrice: "321",
      price: "321",
    },
    {
      image: best1,
      name: "My family",
      author: "Mahadevi Varma",
      cutPrice: "654",
      price: "456",
    },
    {
      image: best2,
      name: "That night",
      author: "Nidhi Updhyay",
      cutPrice: "123",
      price: "321",
    },
    {
      image: best3,
      name: "The family firm",
      author: "Emily Oster",
      cutPrice: "777",
      price: "765",
    },
    {
      image: best4,
      name: "The best couple ever",
      author: "The best couple ever",
      cutPrice: "321",
      price: "321",
    },
  ]);
  return (
    <div className="bookmark container">
      <div className="path">
        <p>Home </p>
        <ArrowForwardIosIcon id="path__icon" />
        <p>Dashboard </p>
        <ArrowForwardIosIcon id="path__icon" />
        <p>My bookmarks</p>
      </div>

      <div className="bookmark__header">
        <h2>My Bookmarks</h2>
        <div className="bookmark__img">
          <img className="col-12" src={bookmark} />
        </div>
      </div>

      {/* <<<<<<<< CART ADDED ALERT >>>>>>>>>> */}
      {show ? (
        <Alert variant="success" id="alert">
          <CheckCircleIcon id="alert__success__icon" />

          <div className="alert__success__text">
            <p>Product added to your cart</p>
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <h6>CHECKOUT NOW</h6>
            </Link>
          </div>

          <CloseIcon
            type="button"
            onClick={() => setShow(false)}
            id="alert__close__icon"
          />
        </Alert>
      ) : (
        ""
      )}

      {/* <<<<<<<< LOGIN ALERT >>>>>>>>>> */}

      {/* {show ? 
                 <Alert variant="primary" id='login__alert'>
                  
                 
                   <InfoIcon id='alert__success__icon'/>
                   
                 
                 <p>Please Login</p>
            
                 <h6 type='button' onClick={()=>setShow(false)}>OK</h6>
                 
              
               
                 </Alert> :''} */}

      {/* <<<<<<<<< WRONG ALERT >>>>>>>>> */}
      {/* {show? 
                 <Alert variant="danger" id='danger__alert'>
                  
                 
                   <CheckCircleIcon id='alert__success__icon'/>
                   
               
                 <p>Somthing went wrong</p>
               
                 <h6 type='button' onClick={()=>setShow(false)} >Refresh</h6>
                 
              
                
                 
                
                 </Alert> :''
              }  */}
      <div className="bookmark__content">
        <Container>
          <Row>
            {item.map((data) => {
              return (
                <Col xs="6" sm="3" md="2">
                  <div className="book__item">
                    <img src={data.image} />

                    <div className="book__item__name">
                      <h6>{data.name}</h6>
                      <p>{data.author}</p>
                    </div>

                    <div className="book__item__price__div">
                      <div className="book__item__price__left">
                        <p className="book__item__cut__price">
                          ₹{data.cutPrice}
                        </p>
                        <p className="book__item__price">₹{data.price}</p>
                      </div>

                      <AddShoppingCartIcon
                        type="button"
                        onClick={() => setShow(true)}
                        id="book__item___cart__icon"
                      />
                    </div>
                  </div>
                </Col>
              );
            })}
            <div className="pagination__div">
              <UsePagination />
            </div>
          </Row>
        </Container>
      </div>
      <Featur />
    </div>
  );
}

export default BookMark;
