import "./../style/css/popularList.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 10,
    
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 6,
  
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4,

  },
};

function PopularList() {

 const [list, setList] = useState([])

 const fetchData = async () => {
  const q = await query(
    collection(db, "categories"),
    orderBy("timestamp", "desc")
  );
      const data =   await getDocs(q)
      setList(data.docs.map((doc) => doc));
};
useEffect  (()=>{
  fetchData()
},[])

  
  return (
    <div className="popular__list ">
     
        <Row>
          <Col lg="1">
            <div className="popular__list__title">
              <h6>Popular categories</h6>
            </div>
          </Col>
          <Col lg="11">
            <Carousel
              swipeable={false}
              draggable={false}
              //   showDots={true}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={2000}
              // customTransition={"ease 2000ms"}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
              //   deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="popular__ani"
            >
              {list.map((data) => {
                return (
                  <Link
                    to={`/books/${data.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="popular__img__div">
                      <img src={data.data().image} />
                      <p>{data.data().title}</p>
                    </div>
                  </Link>
                );
              })}

            
            </Carousel>
          </Col>
        </Row>
     
    </div>
  );
}

export default PopularList;
