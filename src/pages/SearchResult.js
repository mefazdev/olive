import "../style/css/searchResult.css";
import "../style/css/categories.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import best1 from "../images/author/best1.png";
import best2 from "../images/author/best2.png";
import best3 from "../images/author/best3.png";
import best4 from "../images/author/best4.png";
import { useState } from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import PopularList from "../components/PopularList";
import Featur from "../components/Featur";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import FilterSearch from "../components/FilterSearch";
function SearchResult() {
  const [show, setShow] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
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
    <div className="search container">
      <div className="path">
        <p>Home </p>
        <ArrowForwardIosIcon id="path__icon" />
        <p>Search </p>
      </div>
      <div className="search__content">
        <Row>
          <FilterSearch />

          <Col className="search__right__col">
            <div className="search__head__row">
              <h5>
                Search result for "
                <span style={{ color: "#46CE04" }}>Rising Like a Storm</span>"
              </h5>
              <p>5 Books Found</p>
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
            <div className="search__content__row">
              <Row>
                {item.map((data) => {
                  return (
                    <Col xs="6" sm="4" md="3">
                      <div className="book__item">
                        <Link
                          to="/bookSingle"
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <img src={data.image} />
                        </Link>
                        <Link
                          to="/bookSingle"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <div className="book__item__name">
                            <h6>{data.name}</h6>
                            <p>{data.author}</p>
                          </div>
                        </Link>
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
              </Row>
            </div>
          </Col>
        </Row>
      </div>

      <PopularList />
      <Featur />
    </div>
  );
}

export default SearchResult;
