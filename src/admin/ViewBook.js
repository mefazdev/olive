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

import { auth } from "../firebase";
import Footer from "../components/Footer";
import { db, storage } from "../firebase";
import CancelIcon from "@material-ui/icons/Cancel";

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
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { useStateValue } from "../stateProvider";
import { onAuthStateChanged } from "firebase/auth";
import { useParams } from "react-router-dom";
import Product from "../components/Product";
import Header from "../components/Header";
import NavBar from "./NavBar";
import { async } from "@firebase/util";
import Sidebar from "./Sidebar";
function BookView() {
  const id = useParams();

  const [details, setDetails] = useState(true);

  const [isReadMore, setIsReadMore] = useState(true);
  const [product, setProduct] = useState({});

  const [user, setUser] = useState({});
  const [rate, setRate] = useState("");
  const [comment, setComment] = useState("");
  const [commentBox, setCommentBox] = useState(false);
  const [reviewDoc, setReviewDoc] = useState([]);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewLimit, setReviewLimit] = useState(6);
  const [totalRate, setTotalRate] = useState();
  const [oneStar, setOneStar] = useState();
  const [twoStar, setTwoStar] = useState();
  const [threeStar, setThreeStar] = useState();
  const [fourStar, setFourStar] = useState();
  const [fiveStar, setFiveStar] = useState();

  const [modalControl, setModalControl] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState(product.name);
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [language, setLanguage] = useState("");
  const [price, setPrice] = useState("");
  const [cutPrice, setCutPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [edition, setEdition] = useState("");
  const [pages, setPages] = useState("");
  const [bookFormat, setBookFormat] = useState("");
  const [binding, setBinding] = useState("");
  const [multimedia, setMultimedia] = useState("");
  const [desc, setDesc] = useState("");
  const [pubDate, setPubDate] = useState("");
  const [justArrived, setJustArrived] = useState(Boolean);
  const [bestSeller, setBestSeller] = useState(Boolean);
  const [popMalayalam, setPopMalayalam] = useState(Boolean);
  const [classic, setClassic] = useState(Boolean);
  const [thumbnail, setThumbnail] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [stock, setStock] = useState(Number);
  const [offer, setOffer] = useState("");
  const [fethedCategory, setFethedCategory] = useState([]);
  const [all, setAll] = useState(true);
  const [popMlm, setPopMlm] = useState(false);
  const [justArvd, setJustArvd] = useState(false);
  const [bSeller, setBSeler] = useState(false);
  const [authors, setAuthors] = useState([]);

  const fetchData = async () => {
    const docRef = doc(db, "products", id.id);
    const docSnap = await getDoc(docRef);

    setProduct(docSnap.data());
  };

  const setEditData = () => {
    setName(product.name);
    setPublisher(product.publisher);
    setLanguage(product.language);
    setPrice(product.price);
    setCutPrice(product.cutPrice);
    setDiscount(product.discount);
    setEdition(product.edition);
    setPages(product.pages);
    setBookFormat(product.bookformat);
    setBinding(product.binding);
    setMultimedia(product.multimedia);
    setPubDate(product.pubDate);
    setStock(product.stock);
    setDesc(product.description);
    setJustArrived(product.justArrived);
    setThumbnail(product.thumbnail);
    setImage2(product.image2);
    setImage3(product.image3);
    // setAuthor(product.author)
  };
  useEffect(() => {
    setEditData();
  }, [product]);
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

    calTotalRate();
  }, [id]);
  useEffect(() => {
    calTotalRate();
  }, [reviewDoc]);
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

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
      offerZone: false,
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

      if (star == 1) {
        let oneS = star;
        setOneStar(oneS);
      } else if (star == 2) {
        let twoS = star;
        setTwoStar(twoS);
      } else if (star == 3) {
        let threeS = star;
        setThreeStar(threeS);
      } else if (star == 4) {
        let fourS = star;
        setFourStar(fourS);
      } else if (star == 5) {
        let fiveS = star;
        setFiveStar(fiveS);
      }
    });
    setTotalRate(total);
  };

  useEffect(() => {
    fetchReview();
  }, [id]);
  const description = product.description ? product.description : "";

  const handleEdit = async () => {
    setUploading(true);
    const docRef = doc(db, "products", id.id);
    // const docRef = await addDoc(collection(db, "products"), {
    const updateRef = await updateDoc(docRef, {
      name: name,
      author: author,
      publisher: publisher,
      language: language,
      price: price,
      cutPrice: cutPrice,
      discount: discount,
      category: category,
      edition: edition,
      pages: pages,
      bookformat: bookFormat,
      binding: binding,
      multimedia: multimedia,
      description: description,
      pubDate: pubDate,
      stock: stock,
      justArrived:justArrived,
      popMalayalam:popMalayalam,
      bestSeller:bestSeller,
      classic:classic,
      

      timestamp: serverTimestamp(),
    });



    
    

    setUploading(false);
    setModalControl(false);
  };
  const handleThumbnail = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = async (readerEvent) => {
      setThumbnail(readerEvent.target.result);
      const thumbRef = ref(storage, `upload/${id.id}/thumbnail`);
    await uploadString(thumbRef, readerEvent.target.result, "data_url").then(
      async (snapshot) => {
        const downloadURL1 = await getDownloadURL(thumbRef);
        await updateDoc(doc(db, "products", id.id), {
          thumbnail:downloadURL1,
        });
      }
    );
    };
    
    
  };
  const handleImageTwo = async(e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  
    reader.onload = async (readerEvent) => {
      setImage2(readerEvent.target.result);
      const image2Ref = ref(storage, `upload/${id.id}/image2`);

      await uploadString(image2Ref, readerEvent.target.result, "data_url").then(async (snapshot) => {
        const downloadURL = await getDownloadURL(image2Ref);
  
        await updateDoc(doc(db, "products", id.id), {
          image2: downloadURL,
        });
      });
    };

  };
  const handleImageThree = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = async (readerEvent) => {
      setImage3(readerEvent.target.result);
      const image3Ref = ref(storage, `upload/${id.id}/image3`);

    await uploadString(image3Ref, readerEvent.target.result, "data_url").then(async (snapshot) => {
      const downloadURL = await getDownloadURL(image3Ref);

      await updateDoc(doc(db, "products", id.id), {
        image3: downloadURL,
      });
    });
    };
    
  };
  const fetchAuthors = async () => {
    const q = await query(
      collection(db, "authors"),
      orderBy("name")
      //  orderBy('timestamp', "desc")
    );
    const data = await getDocs(q);
    setAuthors(data.docs.map((doc) => doc));
  };
  const fethCategory = async () => {
    const q = await query(
      collection(db, "categories"),
      orderBy("timestamp", "desc")
    );
    onSnapshot(q, (snapshot) => {
      setFethedCategory(snapshot.docs.map((doc) => doc));
    });
  };

  useEffect(() => {
    fetchAuthors();
    fethCategory();
  }, []);
  return (
    <>
      <NavBar/>  
      <Sidebar/>
          <div className="book__single container">
        
        {/* <button onClick={()=>console.log(reviewDoc)}>CLICK</button> */}
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
                  <img   src={product.image3} />
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
                <div style={{display:'flex'}}>
                  <p>Id : </p>
                <h6> {product.productId}</h6>

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
                                <div>
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
                              <h5
                                type="text"
                                onClick={() => setReviewLimit(200)}
                              >
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
        </div>

        <div className="bookView__edit__div">
          {" "}
          <Button
            onClick={() => setModalControl(true)}
            id="bookView__edit__btn"
          >
            Edit
          </Button>
        </div>
      </div>

      {modalControl ? (
        <div className="ad__book__box__modal">
          <div className="ad__book__box">
            <CancelIcon
              id="close__icon"
              onClick={() => setModalControl(false)}
            />

            <Row>
              <Col>
                {" "}
                <div className="add__book__modal__row__item">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    type="text"
                  />
                </div>
              </Col>
              <Col>
                <div className="add__book__modal__row__item">
                  <select onChange={(e) => setAuthor(e.target.value)}>
                    <option>Author</option>
                    {authors.map((data, index) => {
                      const option = data.data().name;
                      return <option id={index}>{option}</option>;
                    })}
                  </select>
                  
                </div>
              </Col>
            </Row>
            {/* <p>Please make sure you have added the author in  authors page <span><Link to='/admin/authors'>Add now</Link> </span></p> */}
            <Row>
              <Col>
                {" "}
                <div className="add__book__modal__row__item">
                  <input
                    placeholder="Publisher"
                    onChange={(e) => setPublisher(e.target.value)}
                    value={publisher}
                  />
                </div>
              </Col>
              <Col>
                <div className="add__book__modal__row__item">
                  <input
                    placeholder="Language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <div className="add__book__modal__row__item">
                  <input
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </Col>
              <Col>
                <div className="add__book__modal__row__item">
                  <input
                    placeholder="Cut-price"
                    value={cutPrice}
                    onChange={(e) => setCutPrice(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <div className="add__book__modal__row__item">
                  <select onChange={(e) => setCategory(e.target.value)}>
                    <option>Category</option>
                    {fethedCategory.map((data, index) => {
                      const option = data.data().title;
                      return <option id={index}>{option}</option>;
                    })}
                  </select>
                </div>
              </Col>
              <Col>
                <div className="add__book__modal__row__item">
                  <input
                    placeholder="Discount"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
              </Col>
            </Row>

            {/* <p>Please make sure you have added the category in  category page <span><Link to='/admin/categories'>Add now</Link> </span></p> */}
            <Row>
              <Col>
                {" "}
                <div className="add__book__modal__row__item">
                  <input
                    placeholder="Edition"
                    value={edition}
                    onChange={(e) => setEdition(e.target.value)}
                  />
                </div>
              </Col>
              <Col>
                <div className="add__book__modal__row__item">
                  <input
                    placeholder="Pages"
                    value={pages}
                    onChange={(e) => setPages(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <div className="add__book__modal__row__item">
                  <input
                    placeholder="Book format"
                    value={bookFormat}
                    onChange={(e) => setBookFormat(e.target.value)}
                  />
                </div>
              </Col>
              <Col>
                <div className="add__book__modal__row__item">
                  <input
                    placeholder="Binding"
                    value={binding}
                    onChange={(e) => setBinding(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <div className="add__book__modal__row__item">
                  <input
                    placeholder="Multimedia"
                    value={multimedia}
                    onChange={(e) => setMultimedia(e.target.value)}
                  />
                </div>
              </Col>
              <Col>
                <div className="add__book__modal__row__item">
                  <label>Publishing Date</label>
                  <input
                    type="date"
                    placeholder="Publishing Date"
                    value={pubDate}
                    onChange={(e) => setPubDate(e.target.value)}
                  />
                </div>
              </Col>
            </Row>

           
            <Row>
              <Col>
                <img src={thumbnail} /> <br />
                <div className="file-input">
                  <input
                    type="file"
                    id="thumbnail"
                    onChange={handleThumbnail}
                  />
                  <label for="thumbnail">Change Thumbnail</label>
                </div>
              </Col>
              <Col>
                <img src={image2} /> <br />
                <div className="file-input">
                  <input type="file" id="img2" onChange={handleImageTwo} />
                  <label for="img2">Change Image 1</label>
                </div>
                
              </Col>
            </Row>
            <Row>
              <Col>
                <img src={image3} /> <br />
                <div className="file-input">
                  <input type="file" id="img3" onChange={handleImageThree} />
                  <label for="img3">Change Image 3</label>
                </div>
              </Col>
              
              <Col>
                <div className="add__book__modal__row__item">
                  <label>Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
              </Col>
            </Row>
            <div className="ad__book__desc">
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Description"
                rows="5"
              />
            </div>
            <Row>
              <Col>  <div className='add__book__modal__radio'>
              <label>Just Arrived ?</label>
               <input
               type='checkbox'
               
               checked={justArrived}
               onChange={((e)=>setJustArrived(!justArrived))}
               />

             </div></Col>
              <Col><div className='add__book__modal__radio'>
              <label>Best Seller ?</label>
              <input
              type='checkbox'
              //  placeholder='Publishing Date'
               value={bestSeller}
               onChange={((e)=>setBestSeller (!bestSeller))}
               />
                            </div></Col>
            </Row>
            
            <Row>
              <Col>  <div className='add__book__modal__radio'>
              <label>Popular Malayalam ?</label>
               <input
               type='checkbox'
              //  value={multimedia}
               onChange={((e)=>setPopMalayalam(!popMalayalam))}
               />

             </div></Col>
              <Col><div className='add__book__modal__radio'>
              <label>Classic ?</label>
              <input
              type='checkbox'
             
               
               onChange={((e)=>setClassic (!classic))}
               />
                            </div></Col>
            </Row>
            <Row>
            <button
            style={{position:'relative',width:'100%',marginTop:'20px'}}
              onClick={handleEdit}
              
            >
              {uploading ? "Uploading" : "Upload"}
            </button>
            </Row>
           
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default BookView;
