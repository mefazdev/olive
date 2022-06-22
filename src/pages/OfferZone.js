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
import { auth, db } from "../firebase";
import { collection, query, getDocs, where } from "@firebase/firestore";
import Product from "../components/Product";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { onAuthStateChanged } from "firebase/auth";
// import Product from "./Product";
function OfferZone() {
  const [offerZone, setOfferZone] = useState([]);
  const [user, setUser] = useState({});
  const [offerCount,setOfferCount] = useState([])

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const fetchData = async () => {
    const q = await query(
      collection(db, "products"),
      where("offerZone", "==", true)
      // orderBy("timestamp", "desc")
    );
    const data = await getDocs(q);
    setOfferZone(data.docs.map((doc) => doc));
  };
  const fetchOfferCount = async()=>{
    const q = await query(
      collection(db, "offerCount"),
      where("userId", "==", user?.uid)
    );
    const docSnap = await getDocs(q);
    setOfferCount(docSnap.docs.map((doc) => doc));
  }

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(()=>{
    fetchOfferCount()
  },[user])
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
{/* <button onClick={()=>console.log(offerCount[0].data().count)} >Check</button> */}
        <div className="categories__content">
          <Row>
            <FilterSearch />

            {/* Categries right Column */}
            <Col>
              <div className="categories__right">
                <div className="offer__image__div">
                  <img className="col-12 col-md-10" src={offer} />

                  <p>

                    {user && offerCount[0]?.data().sentCode == true ? 'Congrates you are elgiable for this offer' : user && offerCount[0]?.data().sentCode == false ?  `You are   ${ 5 - offerCount[0].data().count}         books away from this offer`:
                   'Please login to view your parchase history'
                   }
                                     </p>

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
                        offerZone = {true}
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
