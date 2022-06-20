import { useEffect, useState } from "react";
import "./../style/css/malayalam.css";
import "./../style/css/justArrived.css";

import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

import { Link } from "react-router-dom";
import Product from "./Product";
import { db } from "../firebase";
import { collection, query, getDocs, where } from "@firebase/firestore";

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
function Malayalam() {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState([]);

  const fetchData = async () => {
    const q = await query(
      collection(db, "products"),
      where("popMalayalam", "==", true)
    );
    const data = await getDocs(q);
    setProduct(data.docs.map((doc) => doc));
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="malayalam">
      <div className="malayalam__head__row ">
        <h5>Popular Malayalam Books</h5>
        <Link
          to="/malayalam"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <p>View all</p>
        </Link>
      </div>

      <div className="malayalam__row">
        <Carousel
          swipeable={true}
          draggable={true}
          //   showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          // autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition={"ease 1000ms"}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["mobile"]}
          centerMode={true}
          dotListClass="custom-dot-list-style"
          itemClass="popular__ani"
        >
          {product.map((data) => {
            return (
              <Product
                style={{ textDecoration: "none", color: "inherit" }}
                name={data.data().name}
                author={data.data().author}
                image={data.data().thumbnail}
                price={data.data().price}
                cutPrice={data.data().cutPrice}
                id={data.id}
              />
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

export default Malayalam;
