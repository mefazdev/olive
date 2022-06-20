import React, { useEffect, useState } from "react";

import Featur from "../components/Featur";
import "../style/css/orderConfirm.css";
 
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import Header from "../components/Header";
import { auth, db  } from "../firebase";
import { collection, orderBy, query, getDocs } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Footer from "../components/Footer";
function OrderConfirm() {
  const [bestSeller, setBestSeller] = useState([]);

   
  const [user, setUser] = useState({});
  var [filteredData] = useState([]);

  const [finalDocs, setFinalDocs] = useState([]);
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

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
    <>
      <Header />
      <div className="container">
        <div className="body">
          <div className="container9 container">
            <div className="confirm-container">
              <img
                className="confirm-img col-12"
                src={process.env.PUBLIC_URL + "/images/order-confirm.svg"}
                alt="confirm-image"
              />
              <p className="thanks">Thanks</p>
              <p className="confirmed">
                Your Order <span>Confirmed</span>!
              </p>
              <p className="con-message">
                We've received your order and we well contact you as soon as
                your package is shipped. You can find your purchase information
                "My Account""
              </p>
            </div>
            <div className="confirm-middle">
              <p className="check-name">
                Hey{" "}
                <span> {user && user.email ? user.email.slice(0, 5) : ""}</span>
                ,
              </p>
              <p className="check-text">
                meanwhile check this recommendations. Handcrafted for you
              </p>
            </div>

            <Container className="confirm__book__container">
              <Row>
                {finalDocs.map((data, index) => {
                  if (index < 7) {
                    return (
                      <Col key={index} xs="6" sm="6" md="4">
                        <div className="confirm__book__item">
                          <img src={data.data().thumbnail} />

                          <div className="confirm__item__name">
                            <h6>{data.data().name}</h6>
                            <p>{data.data().author}</p>
                          </div>
                          <div className="confirm__item__bookmark">
                            <BookmarkBorderIcon
                              id="confirm__book__mark__icon"
                              className="book__bookmark__not"
                            />
                            <h5>ADD TO BOOKMARK</h5>
                          </div>
                        </div>
                      </Col>
                    );
                  }
                })}
              </Row>
            </Container>
          </div>
        </div>
        <Featur />
      </div>{" "}
      <Footer />{" "}
    </>
  );
}

export default OrderConfirm;
