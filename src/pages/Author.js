import "../style/css/author.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import pualo from "../images/author/paulo.png";
import best1 from "../images/author/best1.png";
import best2 from "../images/author/best2.png";
import best3 from "../images/author/best3.png";
import best4 from "../images/author/best4.png";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Featur from "../components/Featur";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
function Author() {
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
    <div className="author container">
      <div className="author__content">
        <Container>
          <Row>
            <Col sm="12" md="4" className="author__img__col">
              <img className="col-12" src={pualo} />
            </Col>
            <Col className="author__data__col" md="7">
              <div className="author__data">
                <h2>Paulo Coelho</h2>
                <div className="author__data__row">
                  <h5>Born</h5>

                  <h6>24-07-1947</h6>
                </div>
                <div className="author__data__row">
                  <h5>Genre</h5>

                  <h6>Drama, ‎romance</h6>
                </div>
                <div className="author__data__row">
                  <h5>Language</h5>
                  <h6>Portuguese</h6>
                </div>
                <div className="author__data__row">
                  <h5>Nationality</h5>
                  <h6>Brazilian</h6>
                </div>
                <div className="author__data__row">
                  <h5>Notable works</h5>
                  <h6>The Alchemist</h6>
                </div>
                <div className="author__data__row">
                  <h5>First book</h5>
                  <h6>Theater For Education</h6>
                </div>
                <div className="author__data__row">
                  <h5>Latest Work</h5>
                  <h6>The Archer</h6>
                </div>
              </div>
            </Col>
          </Row>
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
          {/* 
                {show ? 
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
          <Row>
            <Col sm="12" md="4">
              <div className="author__text">
                <p className="col-12">
                  Paulo Coelho was born in Rio de Janeiro, Brazil, and attended
                  a Jesuit school. At 17, Coelho's parents committed him to a
                  mental institution from which he escaped three times before
                  being released at the age of 20.[2][3] Coelho later remarked
                  that "It wasn't that they wanted to hurt me, but they didn't
                  know what to do...
                  <br />
                  <br />
                  They did not do that to destroy me, they did that to save
                  me."At his parents' wishes, Coelho enrolled in law school and
                  abandoned his dream of becoming a writer. One year later, he
                  dropped out and lived life as a hippie, traveling through
                  South America, North Africa, Mexico, and Europe and started
                  using drugs in the 1960s.
                  <br />
                  <br />
                  Upon his return to Brazil, Coelho worked as a songwriter,
                  composing lyrics for Elis Regina, Rita Lee, and Brazilian icon
                  Raul Seixas. Composing with Raul led to Coelho being
                  associated with magic and occultism, due to the content of
                  some songs. He is often accused that these songs were rip-offs
                  of foreign songs not well known in Brazil at the time. In
                  1974, by his account, he was arrested for "subversive"
                  activities and tortured by the ruling military government, who
                  had taken power ten years earlier and viewed his lyrics as
                  left-wing and dangerous. Coelho also worked as an actor,
                  journalist and theatre director before pursuing his writing
                  career.
                </p>
              </div>
            </Col>

            <Col className="author__books" md="7">
              <h3>Books of Coelho</h3>
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
            </Col>
          </Row>
        </Container>
      </div>
      <Featur />
    </div>
  );
}

export default Author;
