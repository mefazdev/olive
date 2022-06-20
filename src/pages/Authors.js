import "../style/css/authors.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  orderBy,
  query,
  getDocs,
  startAt,
  endAt,
} from "@firebase/firestore";

import Button from "@material-ui/core/Button";
import Featur from "../components/Featur";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Header from "../components/Header";
import Footer from "../components/Footer";
function Authors() {
  const [authors, setAuthors] = useState([]);
  const [charector, setCharector] = useState("");

  const fetchData = async () => {
    const q = await query(
      collection(db, "authors"),
      orderBy("name")
      //  orderBy('timestamp', "desc")
    );
    const data = await getDocs(q);
    setAuthors(data.docs.map((doc) => doc));
  };
  const filterData = async () => {
    const q = await query(
      collection(db, "authors"),
      orderBy("name"),
      startAt("p"),
      endAt("o")
      //  orderBy('timestamp', "desc")
    );
    const data = await getDocs(q);
    setAuthors(data.docs.map((doc) => doc));
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    // filterData()
  }, [charector]);
  return (
    <>
      <Header />
      <div className="authors container">
        <div className="path ">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <p>Home </p>
          </Link>
          <ArrowForwardIosIcon id="path__icon" />
          <Link
            to="/preorder"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <p>Authors </p>
          </Link>
        </div>
        <div></div>
        <div className="authors__head">
          <h3>Authors List</h3>

          <div className="author__search">
            <Row>
              <Col md className="author__search__col">
                <p onClick={fetchData} style={{ textDecoration: "underline" }}>
                  ALL
                </p>
                <p onClick={() => setCharector("A")}>A</p>

                <p onClick={() => filterData("B")}>B</p>
                <p onClick={() => filterData("C")}>C</p>
                <p onClick={() => filterData("D")}>D</p>
                <p onClick={() => filterData("E")}>E</p>
                <p onClick={() => filterData("F")}>F</p>
                <p onClick={() => filterData("G")}>G</p>
                <p onClick={() => filterData("H")}>H</p>
                <p onClick={() => filterData("I")}>I</p>

                <p onClick={() => filterData("J")}>J</p>
                <p onClick={() => filterData("K")}>K</p>
                <p onClick={() => filterData("L")}>L</p>
                <p onClick={() => filterData("M")}>M</p>
              </Col>
              <Col md className="author__search__col">
                <p onClick={() => filterData("N")}>N</p>
                <p onClick={() => filterData("O")}>O</p>
                <p onClick={() => filterData("P")}>P</p>
                <p onClick={() => filterData("Q")}>Q</p>
                <p onClick={() => filterData("R")}>R</p>

                <p onClick={() => filterData("S")}>S</p>
                <p onClick={() => filterData("T")}>T</p>
                <p onClick={() => filterData("U")}>U</p>
                <p onClick={() => filterData("V")}>V</p>
                <p onClick={() => filterData("W")}>W</p>
                <p onClick={() => filterData("X")}>X</p>
                <p onClick={() => filterData("Y")}>Y</p>
                <p onClick={() => filterData("Z")}>Z</p>
              </Col>
            </Row>
          </div>

          <div className="authors__row">
            <Row>
              {authors.map((data) => {
                return (
                  <Col>
                    <Link
                      to={`/author/${data.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="authors__item">
                        <img src={data.data().image} />
                        <h6>{data.data().name}</h6>
                        {/* <p>1352 Books</p> */}
                      </div>
                    </Link>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
        <div className="author__load">
          <Button id="author__load__button">LOAD MORE</Button>
        </div>
        <Featur />
      </div>{" "}
      <Footer />{" "}
    </>
  );
}

export default Authors;
