import "./../style/css/bestSellers.css";
import "./../style/css/justArrived.css";

import banner1 from "../images/best/banner1.png";
import banner2 from "../images/best/banner2.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, orderBy, query, getDocs } from "@firebase/firestore";

import Product from "./Product";

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
  const [bestSeller, setBestSeller] = useState([]);
  const [show, setShow] = useState(false);
  var [filteredData] = useState([]);
 
  const [finalDocs, setFinalDocs] = useState([]);




  const fetchData = async () => {
    const q = await query(
      collection(db, "products"),
      orderBy("timestamp", "desc")
    );
    const data = await getDocs(q);
    setBestSeller(data.docs.map((doc) => doc));
  };

  const filterData = () => {
    bestSeller.map((data) => {
      // filteredData.push(data)
      if (data.data().bestSeller == true) {
        // console.log('data>>>>',data.data().name)

        filteredData = [...filteredData, data];

        // setFilteredData(data)
        setFinalDocs(filteredData);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    filterData();
  }, [bestSeller]);
  return (
    <div className="best__seller">
      <div className="best__seller__head__row ">
        <h5>Best Sellers</h5>
         
        <Link
          to="/bestSeller"
          style={{ textDecoration: "none", color: "inherit" }}
        >
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
                itemClass="popular__ani"
              >
                {finalDocs.map((data, index) => {
                  if (index < 20) {
                    return (
                      
                        <Product
                          name={data.data().name}
                          author={data.data().author}
                          image={data.data().thumbnail}
                          price={data.data().price}
                          cutPrice={data.data().cutPrice}
                          id={data.id}
                        />
                  
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
                {finalDocs.map((data, index) => {
                  if (index >= 20   ) {
                    return (
                      // <Link
                      //   to={`/book/${data.id}`}
                      //   style={{ textDecoration: "none", color: "inherit" }}
                      // >
                        <Product
                          name={data.data().name}
                          author={data.data().author}
                          image={data.data().thumbnail}
                          price={data.data().price}
                          cutPrice={data.data().cutPrice}
                          id={data.id}
                        />
                      
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

 