import ".././style/css/home.css";
import Carousel from "react-bootstrap/Carousel";
// import banner1 from "../images/banner/banner-1.png";
import school from "../images/banner/schools.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import PopularList from "../components/PopularList";
import JustArrived from "../components/JustArrived";
import BestSellers from "../components/BestSellers";
import Malayalam from "../components/Malayalam";
import book from "../images/book.png";
import review from "../images/review.png";

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Featur from "../components/Featur";

import Classic from "../components/Classic";
import BookOfMonth from "../components/BookOfMonth";
import BookTalks from "../components/BookTalks";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  serverTimestamp,
  deleteDoc,
  getDocs,
  updateDoc,
  getDoc,
  where,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useForkRef } from "@material-ui/core";
function Home() {
  const [mainBanner, setMainBanner] = useState([]);

  const [smallBanner, setSmallBanner] = useState([]);
  const fetchMainBanner = async () => {
    const q = await query(
      collection(db, "banners"),
      // orderBy("timestamp",'desc'),
      where("position", "==", "Top main banner")
      //  orderBy('timestamp', "desc")
    );
    const data = await getDocs(q);
    setMainBanner(data.docs.map((doc) => doc.data()));
  };
  const fetchSmallBanner = async () => {
    const q = await query(
      collection(db, "banners"),
      // orderBy("timestamp",'desc'),
      where("position", "==", "Top small banner")
      //  orderBy('timestamp', "desc")
    );
    const data = await getDocs(q);
    setSmallBanner(data.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    fetchMainBanner();
    fetchSmallBanner();
  }, []);
  return (
    <>
      <Header />
      <div className="container">
        {/* <<<<<<<<<< MAIN BANNER >>>>>>>>> */}
        <div className=" home__banner">
          <Row>
            <Col>
              <Carousel fade controls={false} indicators={false}>
                {mainBanner.map((data, index) => {
                  return (
                    <Carousel.Item key={index}>
                      <img className="col-12" src={data.image} />
                    </Carousel.Item>
                  );
                })}

                {/* <Carousel.Item>
                  <img className="col-12" src={banner1} />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="col-12" src={banner1} />
                </Carousel.Item> */}
              </Carousel>
            </Col>

            <Col sm="12" md="12" lg="3">
              {smallBanner.map((data, index) => {
                if (index < 1) {
                  return (
                    <div key={index}>
                      <img
                        className="col-12"
                        src={data.image}
                        id="home__banner__right"
                      />
                    </div>
                  );
                }
              })}
            </Col>
          </Row>
        </div>

        {/* <<<<<<<<<< POPULAR LIST >>>>>>>>>>  /components/PopularList.js */}
        <PopularList />

        {/* <<<<<<<<< JUST ARRIVED >>>>>>>>>   src/components/JustArrived.js */}
        <JustArrived />

        {/* <<<<<<<<< BEST SELLERS   src/components/BestSellers.js   >>>>>>>>>   src/components/JustArrived.js */}

        <BestSellers />

        {/* <<<<<<<<< POPULA MALAYALA  src/components/Malayalam.js   >>>>>>>>>   src/components/JustArrived.js */}

        <Malayalam />

        {/* <<<<<<<<< WEB MAGAZINE BOOK REVIEW >>>>>>>>>>>> */}

        <div className="home__exclusive">
          <Row>
            <Col>
              <div className="home__magazine">
                <div className="home__magazine__content">
                  <Container>
                    <Row>
                      <Col sm md="7">
                        <div className="home__magazine__left">
                          <div>
                            <h4> Exclusive</h4>
                            <h1> Web Magazine </h1>
                          </div>

                          <span>
                            <ArrowForwardIcon id="magazine__arrow" />
                          </span>
                        </div>
                      </Col>
                      <Col
                        // sm="12"

                        xs={{ order: "first" }}
                        md={{ order: "last" }}
                      >
                        <img className="col-9" src={book} />
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
            </Col>
            <Col>
              <div className="home__magazine">
                <div className="home__magazine__content">
                  <Container>
                    <Row>
                      <Col sm md="7">
                        <div className="home__magazine__left">
                          <div>
                            <h4> Watch </h4>
                            <h1>Book Reviews</h1>
                          </div>

                          <span>
                            <ArrowForwardIcon id="magazine__arrow" />
                          </span>
                        </div>
                      </Col>
                      <Col
                        // sm="12"
                        // md="12"
                        xs={{ order: "first" }}
                        md={{ order: "last" }}
                      >
                        <img className="col-12" src={review} />
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* <<<<<<<<< BOOK OF THE MONTH>>>>>>>>>>>> */}
        <BookOfMonth />

        {/* <<<<<<<<< BOOK TALKS  >>>>>>>>>>>> */}
        <BookTalks />

        {/* <<<<<<<<< DISCOVER NEW  >>>>>>>>>>>> */}
        <Classic />

        <Featur />
      </div>
      <Footer />
    </>
  );
}

export default Home;
