import "../style/css/categories.css";
import "./../style/css/justArrived.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import book from "../images/book-read.png";

import Featur from "../components/Featur";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import PopularList from "../components/PopularList";
import UsePagination from "../components/Pagination";

import { Link } from "react-router-dom";

import FilterSearch from "../components/FilterSearch";

import JustArrivedBook from "../components/JustArrivedBook";
import { db } from "../firebase";
import { collection, query, getDocs, where } from "@firebase/firestore";
import Header from "../components/Header";

function JustArrived() {
  const [show, setShow] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [product, setProduct] = useState([]);
  const styles = { fontSize: "17px", marginRight: "10px" };

  const fetchData = async () => {
    const q = await query(
      collection(db, "products"),
      where("justArrived", "==", true)
    );
    const data = await getDocs(q);
    setProduct(data.docs.map((doc) => doc));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <div className="categories container">
        <div className="path ">
          <p>Home </p>
          <ArrowForwardIosIcon id="path__icon" />
          <p>Categories </p>
          <ArrowForwardIosIcon id="path__icon" />
          <p> Friction</p>
        </div>

        <div className="categories__content">
          <Row>
            {/* <<<<<<<<<<<<<<< FILTER SEARCH >>>>>>>>>>>>>>>>>>> */}
            <FilterSearch />

            {/* Categries right Column */}
            <Col md="10">
              <div className="categories__right">
                <img
                  id="categories__right__img"
                  className="col-12"
                  src={book}
                />

                <div className="categories__head__row">
                  <h5>Just Arrived</h5>
                  <p>{product.length}Books</p>
                </div>

                {/* <<<<<<<<< WRONG ALERT >>>>>>>>> */}

                <Row>
                  {product.map((data, index) => {
                    return (
                      <Col id={index} xs="6" sm="4" md="2">
                        <Link
                          to={`/book/${data.id}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <JustArrivedBook
                            name={data.data().name}
                            author={data.data().author}
                            image={data.data().thumbnail}
                            price={data.data().price}
                            cutPrice={data.data().cutPrice}
                            offer={data.data().offer}
                          />
                        </Link>
                      </Col>
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
      </div>{" "}
      <Footer />{" "}
    </>
  );
}

export default JustArrived;
