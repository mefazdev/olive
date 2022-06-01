import "./../style/css/bestSellers.css";
import "./../style/css/justArrived.css";
import best1 from "../images/best/img1.jpg";
import best2 from "../images/best/img2.jpg";
import best3 from "../images/best/img3.jpg";
import best4 from "../images/best/img4.jpg";
import best5 from "../images/best/img5.jpg";
import best6 from "../images/best/img6.jpg";
import best7 from "../images/best/img7.jpg";
import best8 from "../images/best/img8.jpg";
import banner1 from "../images/best/banner1.png";
import banner2 from "../images/best/banner2.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
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
import Product from './Product'
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
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

function BestSellers() {
  const [bestSeller,setBestSeller] = useState([])
  const [show, setShow] = useState(false);



  const fetchData = async () => {
    const q = await query(
      collection(db, "products"),
       where("bestSeller", "==", true)
     );
         const data =   await getDocs(q)
           setBestSeller(data.docs.map((doc) => doc));
  };
  

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className="best__seller">
      <div className="best__seller__head__row ">
        <h5>Best Sellers</h5>
        <Link
          to="/bestSeller"
          style={{ textDecoration: "none", color: "inherit" }}>
          <p>View all</p>
         
        </Link>
      </div>

      <div className="best__seller__first__row">
        <Row>
          <Col>
            <div className="best__seller__banner">
              <img className="col-12" src={banner2} />
            </div>
          </Col>
          <Col lg="8">
            <div className="best__seller__first__row__right">
              <Carousel
                swipeable={true}
                draggable={false}
                //   showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={false}
                keyBoardControl={true}
                // customTransition="all .5"
                // transitionDuration={2000}
                customTransition={"ease 700ms"}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["mobile"]}
                centerMode={true}
                dotListClass="custom-dot-list-style"
                itemClass="popular__ani"  >
                {bestSeller.map((data,index) => {

                  if(index < 10){
                    return (
                      <Link
                      to={`/book/${data.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                      >
                      
                      <Product
                   
                      name={data.data().name}
                      author={data.data().author}
                      image={data.data().thumbnail}
                      price={data.data().price}
                      cutPrice={data.data().cutPrice}
                      
                      /> 
                      </Link>
                    );
                  }
                 
                })}
              </Carousel>
            </div>
          </Col>
        </Row>
      </div>

      {/*  SECOND ROW */}
      <div className="best__seller__first__row">
        <Row>
          <Col>
            <div className="best__seller__banner">
              <img className="col-12" src={banner1} />
            </div>
          </Col>
          <Col lg="8">
           
            <div className="best__seller__first__row__right">
              <Carousel
                swipeable={true}
                draggable={false}
              
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={false}
                // autoPlaySpeed={1000}
                keyBoardControl={true}
                // customTransition="all .5" 
                // transitionDuration={2000}
                customTransition={"ease 700ms"}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["mobile"]}
                centerMode={true}
                dotListClass="custom-dot-list-style"
                itemClass="popular__ani"
              >
                {bestSeller.map((data,index) => {
                 if(index < 10){
                  return (
                    <Link
                    to={`/book/${data.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    >
                     <Product
                  name={data.data().name}
                   author={data.data().author}
                   image={data.data().thumbnail}
                   price={data.data().price}
                   cutPrice={data.data().cutPrice}
                   
                   /> 
                    </Link>
                   
                  );
                }
                })}
              </Carousel>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default BestSellers;


//  {/* <<<<<<<< CART ADDED ALERT >>>>>>>>>> */}
//  {show ? (
//   <Alert variant="success" id="alert">
//     <CheckCircleIcon id="alert__success__icon" />

//     <div className="alert__success__text">
//       <p>Product added to your cart</p>
//       <Link to="/cart" style={{ textDecoration: "none" }}>
//         <h6>CHECKOUT NOW</h6>
//       </Link>
//     </div>

//     <CloseIcon
//       type="button"
//       onClick={() => setShow(false)}
//       id="alert__close__icon"
//     />
//   </Alert>
// ) : (
//   ""
// )}

