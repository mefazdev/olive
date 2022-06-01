import "../style/css/authors.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import author3 from "../images/authors/author3.png";
import author4 from "../images/authors/author4.png";
import author5 from "../images/authors/author5.png";
import author6 from "../images/authors/author6.png";
import author7 from "../images/authors/author7.png";

import author8 from "../images/authors/author8.png";
import author9 from "../images/authors/author9.png";
import author10 from "../images/authors/author10.png";
import author11 from "../images/authors/author11.png";
import author12 from "../images/authors/author12.png";
import author13 from "../images/authors/author13.png";
import author14 from "../images/authors/author14.png";
import author15 from "../images/authors/author15.png";
import author16 from "../images/authors/author16.png";
import author17 from "../images/authors/author17.png";
import author18 from "../images/authors/author18.png";
import author19 from "../images/authors/paulo.png";
import author20 from "../images/authors/review.png";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import Featur from "../components/Featur";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
function Authors() {
  const [authors] = useState([
    { image: author19 },
    { image: author20 },
    { image: author3 },
    { image: author4 },
    { image: author5 },
    { image: author6 },
    { image: author7 },
    { image: author8 },

    { image: author9 },
    { image: author10 },
    { image: author11 },
    { image: author12 },
    { image: author13 },
    { image: author14 },
    { image: author15 },
    { image: author16 },
    { image: author17 },
    { image: author18 },
    { image: author16 },
    { image: author17 },
    { image: author18 },
  ]);
  return (
    <div className="authors container">

        <div className="path ">
      <Link to='/' style={{textDecoration:"none", color:'inherit'}}>
        <p>Home </p>
        </Link>
        <ArrowForwardIosIcon id="path__icon" />
        <Link to='/preorder' style={{textDecoration:"none", color:'inherit'}}>
        <p>Authors </p>
        </Link>
     
      </div>
      <div></div>
      <div className="authors__head">
        <h3>Authors List</h3>

        <div className="author__search">
      
            <Row>
              <Col md className="author__search__col">
                <p style={{ textDecoration: "underline" }}>ALL</p>
                <p>A</p>

                <p>B</p>
                <p>C</p>
                <p>D</p>
                <p>E</p>
                <p>F</p>
                <p>G</p>
                <p>H</p>
                <p>I</p>

                <p>J</p>
                <p>K</p>
                <p>L</p>
                <p>M</p>
              </Col>
              <Col md className="author__search__col">
                <p>N</p>
                <p>O</p>
                <p>P</p>
                <p>Q</p>
                <p>R</p>

                <p>S</p>
                <p>T</p>
                <p>U</p>
                <p>V</p>
                <p>W</p>
                <p>X</p>
                <p>Y</p>
                <p>Z</p>
              </Col>
            </Row>
         
        </div>

        <div className="authors__row">
         
            <Row>
              {authors.map((data) => {
                return (
                  <Col>
                    <Link
                      to="/author"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div className="authors__item">
                        <img src={data.image} />
                        <h6>Authors Name</h6>
                        <p>1352 Books</p>
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
    </div>
  );
}

export default Authors;
