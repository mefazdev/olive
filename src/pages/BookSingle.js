import "../style/css/bookSingle.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
 
import StarIcon from "@material-ui/icons/Star";
 
import { Button } from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import ReactStars from "react-rating-stars-component";
import Moment from "moment";
 
import Featur from "../components/Featur";
import PopularList from "../components/PopularList";
 
import { db } from "../firebase";
import { auth } from "../firebase";
import Footer from '../components/Footer'
import {
  addDoc,
  collection,
  onSnapshot,
 
  query,
  getDocs,
  doc,
  serverTimestamp,
 
  where,
  getDoc,
} from "@firebase/firestore";
import { useStateValue } from "../stateProvider";
import { onAuthStateChanged } from "firebase/auth";
import { useParams } from "react-router-dom";
import Product from "../components/Product";
import Header from "../components/Header";
function BookSingle() {
  const id = useParams();
  const [quantity, setQuantity] = useState(1);
  const [bookMark, setBookMark] = useState(false);
  const [details, setDetails] = useState(true);
  const [review, setReview] = useState(false);
  const [show, setShow] = useState(false);
  const [isReadMore, setIsReadMore] = useState(true);
  const [product, setProduct] = useState({});
  const [bestSeller, setBestSeller] = useState([]);
 
  const [user, setUser] = useState({});
  const [rate, setRate] = useState("");
  const [comment, setComment] = useState("");
  const [commentBox, setCommentBox] = useState(false);
  const [reviewDoc, setReviewDoc] = useState([]);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewLimit, setReviewLimit] = useState(6);
  const [totalRate, setTotalRate] = useState();
  const [oneStar,setOneStar] = useState()
  const [twoStar,setTwoStar] = useState()
  const [threeStar,setThreeStar] = useState()
  const [fourStar,setFourStar] = useState()
  const [fiveStar,setFiveStar] = useState()
 

  const fetchData = async () => {
    const docRef = doc(db, "products", id.id);
    const docSnap = await getDoc(docRef);

    setProduct(docSnap.data());
  };

  const fetchBestSeller = async () => {
    const q = await query(
      collection(db, "products"),
      where("bestSeller", "==", true)
    );
    const data = await getDocs(q);
    setBestSeller(data.docs.map((doc) => doc));
  };

  const fetchReview = async () => {
    const bookId = (await id) ? id.id : null;
    const q = await query(
      collection(db, "review"),
      where("bookId", "==", bookId)
    );
    onSnapshot(q, (snapshot) => {
      setReviewDoc(snapshot.docs.map((doc) => doc.data()));
    });
    
  };
  
  useEffect(() => {
    fetchData();
    fetchBestSeller();
    calTotalRate();
  }, [id]);
  useEffect(() => {
    calTotalRate();
  }, [reviewDoc]);
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const addToCart = async () => {
    // setQuantity(true);
    // if (!quantity) {
 
    await addDoc(collection(db, "cart"), {
      quantity: quantity,
      userId: user.uid,
      bookId: id.id,
      thumbnail: product.thumbnail,
      name: product.name,
      author: product.author,
      price: product.price,
      sale:product.sale,
      timestamp: serverTimestamp(),
      // data:data
    });
    // }
  };
  const addToBookMark = async () => {
    setBookMark(!bookMark);
    // setQuantity(true);
    // if (!quantity) {
    await addDoc(collection(db, "bookMark"), {
      thumbnail: product.thumbnail,
      name: product.name,
      author: product.author,
      price: product.price,
      cutPrice: product.cutPrice,
      userId: user.uid,
      // bookId: id,
      timestamp: serverTimestamp(),
      // data:data
    });
    // }
  };
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
 
   

  const postReview = async () => {
    await addDoc(collection(db, "review"), {
      comment: comment,
      rate: rate,
      user: user.email.slice(0, 5),
      bookId: id.id,
      title: reviewTitle,
      date: new Date(),
      offerZone :false,
      timestamp: serverTimestamp(),
    });
    setCommentBox(false);
    setReviewTitle(null);
    setComment(null);
    setRate(null);
  };

  const calTotalRate = async () => {
    let total = 0;
    let oneStar = 0;
    reviewDoc.forEach((element) => {
    let star = parseInt(element.rate);
    total += star;

    if(star == 1){
      let oneS = star
      setOneStar(oneS)
    }else if(star == 2){
      let twoS = star
      setTwoStar(twoS)
    }else if(star == 3) {
     let threeS = star
     setThreeStar(threeS)
    }else if (star == 4){
      let fourS = star
      setFourStar(fourS)
    }else if(star == 5){
      let fiveS = star
      setFiveStar(fiveS)
    }
    });
    setTotalRate(total);
  };
  
  useEffect(() => {
    fetchReview();
  }, [id]);
  const description = product.description ? product.description : "";
  return (
    <>
    <Header/>
    
    <div className="book__single container">
      <div className="path ">
        <p>Home </p>
        <ArrowForwardIosIcon id="path__icon" />
        <p>Categories </p>
 
        <ArrowForwardIosIcon id="path__icon" />
        <p>{product.name}</p>
      </div>
      {/* <button onClick={()=>console.log(id.id)}>CLICK</button> */}
      <div className="book__single__content">
        <Row>
          <Col id="book__single__img__col" md="3">
            <Carousel
              // fade
              controls={true}
              indicators={false}
              interval={2000}
              id="book__single__carousel"
            >
             
              <Carousel.Item>
                <img   src={product.image2} />
              </Carousel.Item>
              <Carousel.Item>
                <img  src={product.image3} />
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
                  <p>({totalRate})</p>
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
                  <span style={{ paddingLeft: "5px" }}>
                    {product.bookFormat}
                  </span>
                </p>
              </div>
              <div className="book__description__text">
                <p>
                  {isReadMore ? description.slice(0, 200) : description}
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
                    onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}
                    id="add__button"
                  >
                    -
                  </Button>
                  <p>{quantity}</p>
                  <Button
                    onClick={() => setQuantity(quantity + 1)}
                    id="add__button"
                  >
                    +
                  </Button>
                </div>
                <Button
                  onClick={addToCart}
                  type="button"
                  id="book__add__button"
                >
                  Add to cart
                </Button>
              </div>

              <div className="book__share__row">
                <div className="book__book__mark" onClick={addToBookMark}>
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
                    Reviews ({reviewDoc.length})
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
                              <p>{reviewDoc.length} Reviews</p>
                              <div className="book__review__rating__star">
                                <StarIcon id="book__star" />
                                <StarIcon id="book__star" />
                                <StarIcon id="book__star" />
                                <StarIcon id="book__star" />
                                <StarIcon id="book__star" />
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => setCommentBox(true)}
                            id="review__button"
                          >
                            Write a Review
                          </button>
                        </div>
                      </Col>
                      <Col id="progress__col">
                        <div className="book__progress__div">
                          <div className="book__progress">
                            <p>5 Star</p>

                            <ProgressBar
                              className="progress__bar"
                              variant="warning"
                              now={fiveStar}
                            />

                            <p>{fiveStar}</p>
                          </div>
                          <div className="book__progress">
                            <p>4 Star</p>

                            <ProgressBar
                              className="progress__bar"
                              variant="warning"
                              now={fourStar} 
                            />

                            <p>{fourStar}</p>
                          </div>
                          
                          <div className="book__progress">
                            <p>3 Star</p>

                            <ProgressBar
                              className="progress__bar"
                              variant="warning"
                              now={threeStar}
                            />

                            <p>{threeStar}</p>
                          </div>
                          <div className="book__progress">
                            <p>2 Star</p>

                            <ProgressBar
                              className="progress__bar"
                              variant="warning"
                              now={twoStar}
                            />

                            <p>{twoStar}</p>
                          </div>
                          <div className="book__progress">
                            <p>1 Star</p>

                            <ProgressBar
                              className="progress__bar"
                              variant="warning"
                              now={oneStar}
                            />

                            <p>{oneStar}</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  {commentBox ? (
                    <div className="reciew__input">
                      <input
                        placeholder="Title"
                        onChange={(e) => setReviewTitle(e.target.value)}
                      />
                      <textarea
                        placeholder="Comment"
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                      />
                      <Row>
                        <Col>
                          <p>Rate this book</p>
                          <ReactStars
                            classNames="add__rate"
                            // id="review__stars"
                            count={5}
                            onChange={setRate}
                            size={34}
                            activeColor="#ffd700"
                          />
                        </Col>
                        <Col>
                          <button onClick={postReview}>Post</button>
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="book__review__content">
                    <Row>
                      <Col xs="12" md="8">
                        {reviewDoc.map((data, index) => {
                          if (index < reviewLimit) {
                            const date = Moment(data.time).format(
                              "MMM DD YYYY"
                            );

                            return (
                              <div key={index}>
                                <div className="review__content__head">
                                  <h6>{data.title}</h6>
                                  <div className="review__stars__div">
                                    <ReactStars
                                      id="review__stars"
                                      count={5}
                                      value={data.rate}
                                      size={24}
                                      activeColor="#ffd700"
                                    />
                                  </div>
                                </div>
                                <div className="review__text">
                                  <p>{data.comment}</p>
                                  <div className="review__date">
                                    <h6>
                                      {date} {data.user}
                                    </h6>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })}
                        {reviewDoc.length != 0 ? (
                          <div className="review__more">
                            <h5 type="text" onClick={() => setReviewLimit(200)}>
                              View All Reviews
                            </h5>
                          </div>
                        ) : (
                          ""
                        )}
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
            {bestSeller.map((data, index) => {
              if (index < 7) {
                return (
                  <Col key={index} xs="6" sm="4" md="2">
                    <Product
                     style={{ textDecoration: "none", color: "inherit" }} 
              name={data.data().name}
              author={data.data().author}
              image={data.data().thumbnail}
              price={data.data().price}
              cutPrice={data.data().cutPrice}
              id = {data.id}
              />
                   
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
    <Footer/>
    </>
  );
}

export default BookSingle;
