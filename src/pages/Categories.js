import "../style/css/categories.css";
import "./../style/css/justArrived.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import book from "../images/book-read.png";

import Featur from "../components/Featur";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Header from "../components/Header";

function Categories() {
  const [category, setCategory] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const fetchData = async () => {
    const q = await query(
      collection(db, "categories"),
      orderBy("timestamp", "desc")
    );
    const data = await getDocs(q);
    setCategory(data.docs.map((doc) => doc));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <div className="categories container">
        <div className="path ">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <p>Home </p>
          </Link>

          <ArrowForwardIosIcon id="path__icon" />
          <Link
            to="/categories"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <p>Categories </p>
          </Link>
        </div>

        <div className="categories__content">
          <div className="categories__right">
            <img id="categories__right__img" className="col-12" src={book} />

            <Row>
              {category.map((data, index) => {
                return (
                  <Col xs="6" sm="4" md="2">
                    <div className="book__item">
                      <Link
                        to={`/books/${data.id}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <img src={data.data().image} />
                      </Link>
                      <Link
                        to="/bookSingle"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <div className="book__item__name">
                          <h6>{data.data().title}</h6>
                        </div>
                      </Link>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>

        <Featur />
      </div>{" "}
      <Footer />{" "}
    </>
  );
}

export default Categories;
