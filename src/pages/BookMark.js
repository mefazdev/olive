import "../style/css/bookMark.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { useEffect, useState } from "react";

import Featur from "../components/Featur";
import bookmark from "../images/bookmark/bookmark.png";

import UsePagination from "../components/Pagination";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

import { db } from "../firebase";
import { auth } from "../firebase";
import Product from "../components/Product";
import { collection, query, getDocs, where } from "@firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";
function BookMark() {
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(false);
  const [user, setUser] = useState({});
  const [bookId, setBookId] = useState();
  const [bookMark, setBookMark] = useState([]);
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const fetchData = async () => {
    const userId = (await user) ? user.uid : null;
    if (userId) {
      const q = await query(
        collection(db, "bookMark"),
        where("userId", "==", userId)
      );
      const docSnap = await getDocs(q);
      setBookMark(docSnap.docs.map((doc) => doc));
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  useEffect(() => {
    console.log(bookMark);
  }, [bookMark]);
  // const addToCart = async () => {
  //   setQuantity(true);
  //   if (!quantity) {
  //     await addDoc(collection(db, "cart"), {
  //       quantity: 1,
  //       userId: user.uid,
  //       bookId: id,
  //       thumbnail: image,
  //       name: name,
  //       author: author,
  //       price: price,
  //       timestamp: serverTimestamp(),
  //       // data:data
  //     });
  //   }
  // };
  return (
    <>
      <Header />
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

        <div className="bookmark__content">
          <Container>
            <Row>
              {bookMark.map((data) => {
                return (
                  <Col xs="6" sm="3" md="2">
                    <Product
                      name={data.data().name}
                      author={data.data().author}
                      image={data.data().thumbnail}
                      price={data.data().price}
                      cutPrice={data.data().cutPrice}
                      id={data.id}
                    />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
        <Featur />
      </div>{" "}
      <Footer />{" "}
    </>
  );
}

export default BookMark;
