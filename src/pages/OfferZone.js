import "../style/css/offerZone.css";
import "../style/css/categories.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SearchIcon from "@material-ui/icons/Search";
import offer from "../images/offer.png";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Featur from "../components/Featur";
import best1 from "../images/author/best1.png";
import best2 from "../images/author/best2.png";
import best3 from "../images/author/best3.png";
import best4 from "../images/author/best4.png";
import PopularList from "../components/PopularList";
import UsePagination from "../components/Pagination";
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import FilterSearch from "../components/FilterSearch";
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
} from "@firebase/firestore";
import Product from "../components/Product";
import Header from "../components/Header";
// import Product from "./Product";
function OfferZone() {
  const [show, setShow] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [item] = useState([
    {
      image: best1,
      name: "My family",
      author: "Mahadevi Varma  ",
      cutPrice: "654",
      price: "456",
    },
    {
      image: best2,
      name: "That night",
      author: "Nidhi Updhyay",
      cutPrice: "123",
      price: "321",
    },
    {
      image: best3,
      name: "The family firm",
      author: "Emily Oster",
      cutPrice: "777",
      price: "765",
    },
    {
      image: best4,
      name: "The best couple ever",
      author: "The best couple ever",
      cutPrice: "321",
      price: "321",
    },
    {
      image: best1,
      name: "My family",
      author: "Mahadevi Varma",
      cutPrice: "654",
      price: "456",
    },
    {
      image: best2,
      name: "That night",
      author: "Nidhi Updhyay",
      cutPrice: "123",
      price: "321",
    },
    {
      image: best3,
      name: "The family firm",
      author: "Emily Oster",
      cutPrice: "777",
      price: "765",
    },
    {
      image: best4,
      name: "The best couple ever",
      author: "The best couple ever",
      cutPrice: "321",
      price: "321",
    },
    {
      image: best1,
      name: "My family",
      author: "Mahadevi Varma",
      cutPrice: "654",
      price: "456",
    },
    {
      image: best2,
      name: "That night",
      author: "Nidhi Updhyay",
      cutPrice: "123",
      price: "321",
    },
    {
      image: best3,
      name: "The family firm",
      author: "Emily Oster",
      cutPrice: "777",
      price: "765",
    },
    {
      image: best4,
      name: "The best couple ever",
      author: "The best couple ever",
      cutPrice: "321",
      price: "321",
    },
  ]);
const [offerZone, setOfferZone ] = useState([])
  
  const fetchData = async () => {
    const q = await query(
      collection(db, "products"),
      where("offerZone", "==", true),
      // orderBy("timestamp", "desc")
    );
    const data = await getDocs(q);
    setOfferZone(data.docs.map((doc) => doc));
  };

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <>
    <Header/>
    
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
    </div></>
  );
}

export default OfferZone;
