import "../style/css/categories.css";
import "./../style/css/justArrived.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import book from "../images/book-read.png";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Featur from "../components/Featur";
import { useEffect, useState } from "react";
import best1 from "../images/author/best1.png";
import best2 from "../images/author/best2.png";
import best3 from "../images/author/best3.png";
import best4 from "../images/author/best4.png";
import PopularList from "../components/PopularList";
import UsePagination from "../components/Pagination";

import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";

import FilterSearch from "../components/FilterSearch";
import Product from "../components/Product";
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
import { useParams } from "react-router-dom";
// import { async } from "@firebase/util";

function BookList({ match }) {
  const [show, setShow] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const id = useParams();

  const fetchCategory = async () => {
    const docRef = doc(db, "categories", id.id);
    const docSnap = await getDoc(docRef);
    // console.log(docSnap.data().title)
    setCategory(docSnap.data().title);
  };

  const fetchData = async () => {
    const q = await query(  
      collection(db, "products"),
      where("category", "==", category)
    );
    const data = await getDocs(q);
    setProducts(data.docs.map((doc) => doc));
  };

  useEffect(async () => {
    fetchCategory();
  }, []);
  useEffect(async () => {
    fetchData();
  }, [category]);

  //  const id = match.params.id
  return (
    <div className="categories container">
      {/* <button onClick={()=>console.log('product >>>>',category)}>Hello</button> */}

      <div className="path ">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <p>Home </p>
        </Link>

        <ArrowForwardIosIcon id="path__icon" />

        <p>{category}</p>
      </div>

      <div className="categories__content">
        <Row>
          {/* <<<<<<<<<<<<<<<  FILTER SEARCH SECTION >>>>>>>>>>>>>> */}
          <FilterSearch />

          {/* Categries right Column */}
          <Col md="10">
            <div className="categories__right">
              <img id="categories__right__img" className="col-12" src={book} />

              <div className="categories__head__row ">
                <h5>{category}</h5>
                <p>{products.length} Books</p>
              </div>

              <Row>
                {products.map((data, index) => {
                  return (
                    <Link
                      to={`/book/${data.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Col xs="6" sm="4" md="2">
                        <Product
                          id={index}
                          name={data.data().name}
                          author={data.data().author}
                          image={data.data().thumbnail}
                          price={data.data().price}
                          cutPrice={data.data().cutPrice}
                        />
                      </Col>
                    </Link>
                  );
                })}
                <div className="pagination__div">
                  <UsePagination />
                </div>
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

export default BookList;
