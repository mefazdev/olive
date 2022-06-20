import "../style/css/categories.css";
import "./../style/css/justArrived.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import book from "../images/book-read.png";

import Featur from "../components/Featur";
import { useEffect, useState } from "react";

import PopularList from "../components/PopularList";

import { Link } from "react-router-dom";

import FilterSearch from "../components/FilterSearch";
import Product from "../components/Product";
import { db } from "../firebase";
import {
  collection,
  query,
  getDocs,
  doc,
  where,
  getDoc,
} from "@firebase/firestore";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function BookList({ match }) {
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const id = useParams();
  const [startIndex, setStartIndex] = useState(-1);
  const [endIndex, setEndIndex] = useState(49);

  const fetchCategory = async () => {
    const docRef = doc(db, "categories", id.id);
    const docSnap = await getDoc(docRef);

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

  const nextPage = () => {
    setStartIndex(startIndex + 49);
    setEndIndex(endIndex + 49);
  };
  const prevPage = () => {
    if (startIndex >= 48) {
      setStartIndex(startIndex - 49);
      setEndIndex(endIndex - 49);
    }
  };
  useEffect(async () => {
    fetchCategory();
  }, []);
  useEffect(async () => {
    fetchData();
  }, [category]);

  return (
    <>
      <Header />
      <div className="categories container">
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
                <img
                  id="categories__right__img"
                  className="col-12"
                  src={book}
                />

                <div className="categories__head__row ">
                  <h5>{category}</h5>
                  <p>{products.length} Books</p>
                </div>

                <Row>
                  {products.map((data, index) => {
                    if (index > startIndex && index < endIndex) {
                      return (
                        <Col xs="6" sm="4" md="2">
                          <Product
                            key={index}
                            name={data.data().name}
                            author={data.data().author}
                            image={data.data().thumbnail}
                            price={data.data().price}
                            cutPrice={data.data().cutPrice}
                            id={data.id}
                          />
                        </Col>
                      );
                    }
                  })}
                  <div className="pagination__div">
                    <button onClick={prevPage}>PREV</button>
                    <button onClick={nextPage}> NEXT</button>
                  </div>
                  {/* <div className="pagination__div">
                  <UsePagination />
                </div> */}
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <PopularList />

        <Featur />
      </div>{" "}
      <Footer />{" "}
    </>
  );
}

export default BookList;
