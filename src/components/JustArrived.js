import "./../style/css/justArrived.css";

import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";

import { db, storage } from "../firebase";
import { collection, query, getDocs, where } from "@firebase/firestore";
import Product from "./JustArrivedBook";
// import { useStateValue } from "../stateProvider";

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
    const data = await getDocs(q);
    setArrived(data.docs.map((doc) => doc));
  };


  useEffect(() => {
    fetchData();
  }, []);



// ADD TO CART FUNCTIONS




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
          {arrived.map((data, index) => {
            if (index < 20) {
              return (
                 
                  <Product
                     
                    name={data.data().name}
                    author={data.data().author}
                    image={data.data().thumbnail}  
                    price={data.data().price}
                    cutPrice={data.data().cutPrice}
                    offer={data.data().discount}
                     id={data.id}
                  />
          
              );
            }
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default JustArrived;
