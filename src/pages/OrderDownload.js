import { useEffect, useState } from "react";
import "../style/css/cart.css";
import "../style/css/orderDownload.css";

import { Button } from "@material-ui/core";
import Featur from "../components/Featur";
import Header from "../components/Header";
import { db } from "../firebase";
import moment from "moment";
import Footer from "../components/Footer";
import {
  collection,
  query,
  getDocs,
  doc,
  where,
  getDoc,
} from "@firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useParams } from "react-router-dom";

import { Col, Row } from "react-bootstrap";
function OrderDownload() {
  const id = useParams();

  const [order, setOrder] = useState({});
  const [address, setAddress] = useState([]);
  const [user, setUser] = useState({});

  const recivedDate = moment.unix(order.recivedDate).format("MMM DD, YY");
  const shippedDate = moment.unix(order.shippedDate).format("MMM DD, YY");
  const deliveredDate = moment.unix(order.deliveredDate).format("MMM DD, YY");

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const fetchData = async () => {
    const docRef = doc(db, "order", id.id);
    const docSnap = await getDoc(docRef);

    setOrder(docSnap.data());
  };

  const fetchAddress = async () => {
    const userId = await user?.uid;
    if (user) {
      const q = await query(
        collection(db, "address"),
        where("userID", "==", user?.uid)
      );
      const data = await getDocs(q);
      setAddress(data.docs.map((doc) => doc.data()));
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  useEffect(() => {
    fetchAddress();
  }, [user]);

  return (
    <>
      <Header />
      <div className="order__down container">
        <div className="order__down__content">
          <div className="order__down__product">
            <div className="order__down__head">
              <span className="order__down__round">
                <p>1</p>
              </span>
              <h5>Products</h5>
            </div>
            <Row>
              {order.order
                ? order.order.map((data, index) => {
                    return (
                      <Col sm="auto" md="3">
                        <div className="order__item">
                          <img src={data.thumbnail} />
                          <h6>{data.name}</h6>
                          <p>₹{data.price}</p>
                          <h5>Qty : {data.quantity}</h5>
                        </div>
                      </Col>
                    );
                  })
                : ""}
            </Row>
          </div>

          {/* <<<<<<<< ADDRESS >>>>>>>>>>>>>> */}

          <div className="order__down__address">
            <div className="order__down__head">
              <span className="order__down__round">
                <p>2</p>
              </span>
              <h5>Address</h5>
            </div>
            {address.map((data, index) => {
              return (
                <div className="order__down__adress__box">
                  <div className="order__down__adress__content">
                    <h6>{data.name}</h6>
                    <p>House No: {data.houseNo}</p>
                    <p>{data.streetAddress}</p>
                    <p>{data.district}</p>
                    <p>{data.state}</p>
                    <p>India, {data.pin}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* <<<<<<<<< Amount Breakdown >>>>>>>> */}
          <div className="order__down__amount">
            <div className="order__down__head">
              <span className="order__down__round">
                <p>3</p>
              </span>
              <h5>Amount Breakdown</h5>
            </div>

            <div className="order__down__amount__box">
              <div className="order__down__amount__content">
                <div className="order__down__amount__row">
                  <div className="order__down__amount__left">
                    <p>Sub Total :</p>
                  </div>
                  <div className="order__down__amount__right">
                    <p>₹ {order.total - 50}</p>
                  </div>
                </div>

                <div className="order__down__amount__row">
                  <div className="order__down__amount__left">
                    <p>Shipping Charge :</p>
                  </div>
                  <div className="order__down__amount__right">
                    <p>₹ 50</p>
                  </div>
                </div>
                <div className="order__down__amount__row">
                  <div className="order__down__amount__left">
                    <h6>TOTAL</h6>
                  </div>
                  <div className="order__down__amount__right">
                    <h5>₹ {order.total}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <<<<<<<<<<<<< STATUS >>>>>>>>>>>> */}

          <div className="order__down__status">
            <div className="order__down__head">
              <span className="order__down__round">
                <p>4</p>
              </span>
              <h5>Status</h5>
            </div>

            <div className="order__down__status__box">
              <div className="order__down__status__content">
                <div className="order__down__status__row">
                  <div className="order__down__status__left">
                    <p>
                      {order.status === "Not Shipped"
                        ? recivedDate
                        : order.status === "Shipped"
                        ? shippedDate
                        : deliveredDate}
                      {/* {recivedDate} */}
                    </p>
                  </div>
                  <div className="order__down__status__right">
                    <p>
                      {order.status == "Not Shipped"
                        ? "Order recived"
                        : order.status}
                    </p>
                  </div>
                </div>
                {/* <div className="order__down__status__row">
                <div className="order__down__status__left">
                  <p>13-12-2020</p>
                </div>
                <div className="order__down__status__right">
                  <p>Shipped</p>
                </div>
              </div> */}
                {/* <div className="order__down__status__row">
                <div className="order__down__status__left">
                  <p>18-12-2020</p>
                </div>
                <div className="order__down__status__right">
                  <p>Delivered</p>
                </div>
              </div> */}
              </div>
            </div>
          </div>
          {/* <<<<<<<<<<<<< DOWNLOAD BUTTON >>>>>>>>>>>>>>> */}
          {/* <div className="order__down__button">
            <Button id="order__download__button">DOWNLOAD </Button>
          </div> */}
        </div>

        <Featur />
      </div>{" "}
      <Footer />{" "}
    </>
  );
}

export default OrderDownload;
