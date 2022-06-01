import "../style/css/preOrder.css";
import "../style/css/bookSingle.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import book from "../images/single.png";
import StarIcon from "@material-ui/icons/Star";
import AddIcon from "@material-ui/icons/Add";
import MinimizeIcon from "@material-ui/icons/Minimize";
import { Button, ButtonBase } from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import { useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import ReactStars from "react-rating-stars-component";
import best1 from "../images/author/best1.png";
import best2 from "../images/author/best2.png";
import best3 from "../images/author/best3.png";
import best4 from "../images/author/best4.png";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Featur from "../components/Featur";
import PopularList from "../components/PopularList";
import prebook from "../images/prebook.png";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
function PreOrder() {

  const [quantity,setQuantity] = useState(1)
  const [show, setShow] = useState(false);
  const [bookMark, setBookMark] = useState(false);
  const [details, setDetails] = useState(true);
  const [review, setReview] = useState(false);
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const [data] = useState([
    {
      tittle: "Great Story! You Love it",
      text: "Nice book... It should be read by the one who want to learn something to be better in life..... But in this book(think and.....) they have given only their own successful peopl example..Due to which a common man may think about them only except our own successful person....",
      stars: 4,
      date: "2021 April 7 | Alex M",
    },
    {
      tittle: "Amazing offer on amazing books",
      text: `'Ours have the world's greatest epic Shrimad Bhagwad Geeta this book alone can change the life of the man who read this...... It seems like I m exaggerating but trust me whoever read this epic no one could tell that it's not a perfect book..... Even other religious people read and admire this book.....'`,
      stars: 3,
      date: "2021 April 7 | Alex M",
    },
    {
      tittle: "Box was damaged, and crumpled",
      text: "The shipping was ok, but it could be the fault of the handling process. The box had dents and the books as well",
      stars: 2,
      date: "2021 April 7 | Alex M",
    },
    {
      tittle:
        "Waste of time for investors who wants to learn more about investing",
      text: "Nice book... It should be read by the one who want to learn something to be better in life..... But in this book(think and.....) they have given only their own successful peopl example..Due to which a common man may think about them only except our own successful person....",
      stars: 3,
      date: "2021 April 7 | Alex M",
    },
  ]);

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
  ]);

  const text = `  In the concluding installment to the Wrath of Ambar duology
  from masterful author Tanaz Bhathena, Gul and Cavas must
  unite their magical forces―and hold onto their growing
  romance―to save their kingdom from tyranny. 
  In the concluding installment to the Wrath of Ambar duology
  from masterful author Tanaz Bhathena, Gul and Cavas must
  unite their magical forces―and hold onto their growing
  romance―to save their kingdom from tyranny. 

  With King Lohar dead and a usurper queen in power, Gul and
  Cavas face a new tyrannical government that is bent on
  killing them both. Their roles in King Lohar's death have
  not gone unnoticed, and the new queen is out for blood. 
`;
  return (
    <div className="preOrder container">
      <div className="path ">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <p>Home </p>
        </Link>
        <ArrowForwardIosIcon id="path__icon" />
        <Link
          to="/preorder"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <p>Pre-order </p>
        </Link>
      </div>

      <div className="book__single__content">
        {/* <Container> */}
        <Row>
          <Col id="book__single__img__col" xm="12" md="3">
            <Carousel
              fade
              controls={true}
              indicators={true}
              id="book__single__carousel"
            >
              <Carousel.Item>
                <img className="col-12 " src={prebook} />
              </Carousel.Item>
              <Carousel.Item>
                <img className="col-12 " src={prebook} />
              </Carousel.Item>
              <Carousel.Item>
                <img className="col-12 " src={prebook} />
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col md="7" className="book__description__col">
            <div className="book__description">
              <h2>DARK LANDS</h2>
              <div className="book__description__star__row">
                <div className="book__description__star__left">
                  <StarIcon id="book__star" />
                  <StarIcon id="book__star" />
                  <StarIcon id="book__star" />
                  <StarIcon id="book__star" />
                  <StarIcon id="book__star" />
                  <p>(274)</p>
                </div>
                <div className="book__description__star__right">
                  <p>By</p>
                  <h6>Tanaz Bhathena</h6>
                </div>
              </div>

              <div className="book__description__price">
                <h5>₹450</h5>
                <p>
                  Book Format:
                  <span style={{ paddingLeft: "5px" }}>Paperback</span>
                </p>
              </div>
              <div className="book__description__text">
                <p>
                  {isReadMore ? text.slice(0, 550) : text}
                  <span
                    onClick={toggleReadMore}
                    style={{ color: "#46CE04", cursor: "pointer" }}
                  >
                    {isReadMore ? "...read more" : " show less"}
                  </span>
                </p>
              </div>

              <div className="book__description__button__row">
                <div className="book__description_increment">
                  <Button onClick={()=>setQuantity(quantity > 0 ? quantity-1 : 0 )}id="add__button">
                    -
                  </Button>
                  <p>{quantity}</p>
                  <Button   onClick={()=>setQuantity(quantity+1)} id="add__button">
                    +
                  </Button>
                </div>
                <Button
                  onClick={""}
                  type="button"
                  id="book__add__button"
                  style={{ background: "#46CE04" }}
                >
                  PREORDER
                </Button>
              </div>

              <div className="book__share__row">
                <div
                  className="book__book__mark"
                  onClick={() => setBookMark(!bookMark)}
                >
                  <BookmarkBorderIcon
                    id="book__bookmark__icon"
                    className={bookMark ? "bookMark" : "book__bookmark__icon"}
                  />
                  <p>ADD TO BOOKMARK</p>
                </div>
                <div className="book__share">
                  <ShareOutlinedIcon id="book__share__icon" />
                  <p>SHARE</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="book__detailes">
              <div className="book__detailes__head">
                <div className="book__detailes__head__content">
                  <h6
                    onClick={() => setDetails(true)}
                    className={
                      details
                        ? "book__detailes__active"
                        : "book__detailes__head__h6"
                    }
                  >
                    Product Details
                  </h6>
                  <h6
                    onClick={() => setDetails(false)}
                    className={
                      !details
                        ? "book__detailes__active"
                        : "book__detailes__head__h6"
                    }
                  >
                    Reviews (12)
                  </h6>
                </div>
              </div>
              {details ? (
                <Row>
                  <Col>
                    <div className="book__detailes__content col-md-10">
                      <div className="book__detailes__row">
                        <h6>AUTHOR</h6>
                        <div className="book__detailes__row__right ">
                          <p>Tanaz Bhathena</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>CATEGORY</h6>
                        <div className="book__detailes__row__right ">
                          <p>Novel</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>PUBLISHING DATE</h6>
                        <div className="book__detailes__row__right ">
                          {" "}
                          <p>2019, March</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>EDITION</h6>
                        <div className="book__detailes__row__right ">
                          {" "}
                          <p>1</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>BINDING</h6>
                        <div className="book__detailes__row__right ">
                          {" "}
                          <p>Normal</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>NUMBER OF PAGES</h6>
                        <div className="book__detailes__row__right ">
                          {" "}
                          <p>386</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>PUBLISHER</h6>
                        <div className="book__detailes__row__right ">
                          {" "}
                          <p>DC BOOKS</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>MULTIMEDIA</h6>
                        <div className="book__detailes__row__right ">
                          <p>Not Available</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>LANGAGE</h6>
                        <div className="book__detailes__row__right ">
                          <p>ENGLISH</p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              ) : (
                <div className="book__review">
                  <div className="book__review__first__row">
                    <Row>
                      <Col md="3">
                        <div className="book__review__first__row__left">
                          <h4>Customer Reviews</h4>
                          <div className="book__review__rating">
                            <h1>4.7</h1>
                            <div className="book__review__rating__right">
                              <p>285 Reviews</p>
                              <div className="book__review__rating__star">
                                <StarIcon id="book__star" />
                                <StarIcon id="book__star" />
                                <StarIcon id="book__star" />
                                <StarIcon id="book__star" />
                                <StarIcon id="book__star" />
                              </div>
                            </div>
                          </div>

                          <button id="review__button">Write a Review</button>
                        </div>
                      </Col>
                      <Col id="progress__col">
                        <div className="book__progress__div">
                          <div className="book__progress">
                            <p>5 Star</p>

                            <ProgressBar
                              className="progress__bar"
                              variant="warning"
                              now={80}
                            />

                            <p>200</p>
                          </div>
                          <div className="book__progress">
                            <p>4 Star</p>

                            <ProgressBar
                              className="progress__bar"
                              variant="warning"
                              now={60}
                            />

                            <p>50</p>
                          </div>
                          <div className="book__progress">
                            <p>5 Star</p>

                            <ProgressBar
                              className="progress__bar"
                              variant="warning"
                              now={40}
                            />

                            <p>200</p>
                          </div>
                          <div className="book__progress">
                            <p>3 Star</p>

                            <ProgressBar
                              className="progress__bar"
                              variant="warning"
                              now={30}
                            />

                            <p>14</p>
                          </div>
                          <div className="book__progress">
                            <p>2 Star</p>

                            <ProgressBar
                              className="progress__bar"
                              variant="warning"
                              now={15}
                            />

                            <p>20</p>
                          </div>
                          <div className="book__progress">
                            <p>1 Star</p>

                            <ProgressBar
                              className="progress__bar"
                              variant="warning"
                              now={10}
                            />

                            <p>8</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="book__review__content">
                    <Row>
                      <Col xs="12" md="8">
                        {data.map((data) => {
                          return (
                            <div>
                              <div className="review__content__head">
                                <h6>{data.tittle}</h6>
                                <div className="review__stars__div">
                                  <ReactStars
                                    id="review__stars"
                                    count={5}
                                    // onChange={4}
                                    value={data.stars}
                                    size={24}
                                    activeColor="#ffd700"
                                  />
                                </div>
                              </div>
                              <div className="review__text">
                                <p>{data.text}</p>
                                <div className="review__date">
                                  <h6>{data.date}</h6>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        <div className="review__more">
                          <h5 type="text">View All Reviews</h5>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>

        {/* <<<<<<<<<<< ALSO BROUGHT BOOKS */}

        <div className="also__brought">
          <div className="also__brought__head">
            <h6>
              Customers Who Bought{" "}
              <span style={{ color: "#46CE04" }}>Rising Like a Storm</span> also
              brought
            </h6>
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
          <Row>
            {item.map((data) => {
              return (
                <Col xs="6" sm="4" md="2">
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
        <div></div>
      </div>

      <PopularList />

      <Featur />
    </div>
  );
}

export default PreOrder;
