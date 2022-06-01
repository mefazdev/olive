import "./../style/css/justArrived.css";
import pop1 from "../images/popular/pop1.jpg";
import pop2 from "../images/popular/pop2.jpg";
import pop3 from "../images/popular/pop3.jpg";
import pop4 from "../images/popular/pop4.jpg";
import pop6 from "../images/popular/pop6.jpg";
import pop8 from "../images/popular/pop8.jpg";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import { Button } from "bootstrap";
import { ButtonGroup } from "@material-ui/core";
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
  where
} from "@firebase/firestore";
import Product from "./JustArrivedBook";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
  },
};
function JustArrived() {
  const [show, setShow] = useState(false);
  const [arrived, setArrived] = useState([]);



  const fetchData = async () => {
    const q = await query(
      collection(db, "products"),
       where("justArrived", "==", true)
     );
         const data =   await getDocs(q)
           setArrived(data.docs.map((doc) => doc));
  };
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className="arrived">
      <div className="arrived__head__row ">
        <h5>Just arrived</h5>
        <Link
          to="/justArrived"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <p>View all</p>
        </Link>
      </div>

      {/* CART ALERTS */}

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

     
      <div className="arrived__row">
        <Carousel
          swipeable={true}
          draggable={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
          customTransition={"ease 1000ms"}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["mobile"]}
          centerMode={true}
          dotListClass="custom-dot-list-style"
          itemClass="popular__ani"
        >
          {arrived.map((data,index) => {
             if(index < 20){
              return (
                <Link to={`/book/${data.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
>
                <Product
                name={data.data().name}
                author={data.data().author}
                image={data.data().thumbnail}
                price={data.data().price}
                cutPrice={data.data().cutPrice}  
                offer={data.data().offer}
                />
                </Link>
                
              );
            } 
           
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default JustArrived;
