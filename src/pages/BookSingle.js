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
import { Button } from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import ReactStars from "react-rating-stars-component";
import best1 from "../images/author/best1.png";
import best2 from "../images/author/best2.png";
import best3 from "../images/author/best3.png";
import best4 from "../images/author/best4.png";
import pop4 from "../images/popular/pop4.jpg";
import pop6 from "../images/popular/pop6.jpg";
import pop8 from "../images/popular/pop8.jpg";
import prebook from "../images/prebook.png";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Featur from "../components/Featur";
import PopularList from "../components/PopularList";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
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
  getDoc
} from "@firebase/firestore";
import {
    
    useParams
  } from "react-router-dom";
import Product from "../components/Product";
function BookSingle() {

  const  id = useParams()
  const [quantity,setQuantity] = useState(1)
  const [bookMark, setBookMark] = useState(false);
  const [details, setDetails] = useState(true);
  const [review, setReview] = useState(false);
  const [show, setShow] = useState(false);
  const [isReadMore, setIsReadMore] = useState(true);
const [product, setProduct] = useState({})
const [bestSeller, setBestSeller] = useState([])

  const fetchData = async () => {
    const docRef =  doc(db, "products", id.id);
    const docSnap = await getDoc(docRef);
        
      setProduct(docSnap.data())        
      console.log(docSnap.data())  
  };

  const fetchBestSeller = async () => {
    const q = await query(
      collection(db, "products"),
       where("bestSeller", "==", true)
     );
         const data =   await getDocs(q) 
           setBestSeller(data.docs.map((doc) => doc));
  };
  useEffect(()=>{
    fetchData()
    fetchBestSeller()
  },[])


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
  const description =  product.description ? product.description :''
  return (
    <div className="book__single container">
      <div className="path ">
        <p>Home </p>
        <ArrowForwardIosIcon id="path__icon" />
        <p>Categories </p>
        
        <ArrowForwardIosIcon id="path__icon" />
        <p>{product.name}</p>
      </div>

      <div className="book__single__content">
        <Row>
          <Col id="book__single__img__col" md="3">
            <Carousel
              fade
              controls={true}
              indicators={true}
              id="book__single__carousel"
            >
              {/* <Carousel.Item>
                <img className="col-12" src={product.thumbnail} />
              </Carousel.Item> */}
              <Carousel.Item>
                <img className="col-12" src={product.image2} />
              </Carousel.Item>
              <Carousel.Item>
                <img className="col-12" src={product.image3} />
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col md="7" className="book__description__col">
            <div className="book__description">
              <h2>{product.name}</h2>
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
                  <h6>{product.author}</h6>
                </div>
              </div>

              <div className="book__description__price">
                <h5>₹{product.price}</h5>
                <p>
                  Book Format:
                  <span style={{ paddingLeft: "5px" }}>{product.bookFormat}</span>
                </p>
              </div>
              <div className="book__description__text">
                <p>
                  {isReadMore ? description.slice(0, 550) : description}
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
                  <Button
                  onClick={()=>setQuantity(quantity > 0 ? quantity-1 : 0 )}
                   id="add__button">
                    -
                  </Button>
                  <p>{quantity}</p>
                  <Button onClick={()=>setQuantity(quantity+1)} id="add__button">
                    +
                  </Button>
                </div>
                <Button onClick={""} type="button" id="book__add__button">
                  Add to cart
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
                        <h6>Authors</h6>
                        <div className="book__detailes__row__right ">
                          <p>{product.author}</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>CATEGORY</h6>
                        <div className="book__detailes__row__right ">
                          <p>{product.category}</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>PUBLISHING DATE</h6>
                        <div className="book__detailes__row__right ">
                          <p>{product.pubDate}</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>EDITION</h6>
                        <div className="book__detailes__row__right ">
                          <p>{product.edition}</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>BINDING</h6>
                        <div className="book__detailes__row__right ">
                          <p>{product.binding}</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>NUMBER OF PAGES</h6>
                        <div className="book__detailes__row__right ">
                          <p>{product.pages}</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>PUBLISHER</h6>
                        <div className="book__detailes__row__right ">
                          <p>DC BOOKS</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>MULTIMEDIA</h6>
                        <div className="book__detailes__row__right ">
                          <p>{product.multimedia}</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>LANGUAGE</h6>
                        <div className="book__detailes__row__right ">
                          <p>{product.language}</p>
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
              Customers Who Bought
              <span style={{ color: "#46CE04" }}> {product.name}</span> also
              brought
            </h6>
          </div>

          <Row>
            {bestSeller.map((data,index) => {
              if(index < 7){
                return (
                
                  <Col id={index} xs="6" sm="4" md="2">
                    <div className="book__item">
                      <Link
                       to={`/book/${data.id}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <img src={data.data().thumbnail} />
                      </Link>
                      <Link
                        to="/bookSingle"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <div className="book__item__name">
                          <h6>{data.data().name}</h6>
                          <p>{data.data().author}</p>
                        </div>
                      </Link>
                      <div className="book__item__price__div">
                        <div className="book__item__price__left">
                          <p className="book__item__cut__price">
                            ₹{data.data().cutPrice}
                          </p>
                          <p className="book__item__price">₹{data.data().price}</p>
                        </div>
   
                        <AddShoppingCartIcon
                          type="button"
                    
                          id="book__item___cart__icon"
                        />
                      </div>
                    </div>
                  </Col>
                );
              }
              
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

export default BookSingle;
