import "../style/css/offerZone.css";
import "../style/css/categories.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import offer from "../images/offer.png";

import Featur from "../components/Featur";

import PopularList from "../components/PopularList";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import FilterSearch from "../components/FilterSearch";
import { db } from "../firebase";
import { collection, query, getDocs, where } from "@firebase/firestore";
import Product from "../components/Product";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import Product from "./Product";
function OfferZone() {
  const [offerZone, setOfferZone] = useState([]);

  const fetchData = async () => {
    const q = await query(
      collection(db, "products"),
      where("offerZone", "==", true)
      // orderBy("timestamp", "desc")
    );
    const data = await getDocs(q);
    setOfferZone(data.docs.map((doc) => doc));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <div className="offer__zone container">
        <div className="path ">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <p>Home </p>
          </Link>
          <ArrowForwardIosIcon id="path__icon" />
          <Link
            to="/offerZone"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <p>Offerszone</p>
          </Link>
        </div>

        <div className="categories__content">
          <Row>
            <FilterSearch />

            {/* Categries right Column */}
            <Col md="10">
              <div className="categories__right">
                <div className="offer__image__div">
                  <img className="col-12 col-md-10" src={offer} />

                  <p>
                    You are <span>3</span> books away from this offer{" "}
                  </p>

                  {/*  if not logd in */}
                  {/* <p>Please login to view your parchase histor</p> */}
                  {/* if eligaible for offer */}
                  {/* <p>Congrates you are elgiable for this offer</p> */}
                </div>

                <div className="offerzone__head__row ">
                  <h5>Offerzone</h5>

                  <p>{offerZone.length} Books</p>
                </div>
              </div>

              <Row>
                {offerZone.map((data) => {
                  return (
                    <Col xs="6" sm="4" md="2">
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

export default OfferZone;
