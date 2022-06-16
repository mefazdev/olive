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
import { useEffect, useState } from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import Featur from "../components/Featur";
import bookmark from "../images/bookmark/bookmark.png";

import UsePagination from "../components/Pagination";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import { db, storage } from "../firebase";
import { auth } from "../firebase";
import Product from "../components/Product";
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
import { useStateValue } from "../stateProvider";
import { onAuthStateChanged } from "firebase/auth";
import createUtilityClassName from "react-bootstrap/esm/createUtilityClasses";
import Header from "../components/Header";

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
    <><Header/>
    <div className="bookmark container">
      <div className="path">
        <p>Home </p>
        <ArrowForwardIosIcon id="path__icon" />
        <p>Dashboard </p>
        <ArrowForwardIosIcon id="path__icon" />
        <p>My bookmarks</p>
      </div>
      <button onClick={() => console.log(bookMark)}>CLICK</button>
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
                    // image=''
                    price={data.data().price}
                    cutPrice={data.data().cutPrice}
                    id={data.id}
                  />
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
    </div> </>
  );
}

export default BookMark;
