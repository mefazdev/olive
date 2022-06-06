import "../style/css/cart.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { useState, useEffect, useId } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button, ButtonBase } from "@material-ui/core";
import Featur from "../components/Featur";
import { Link } from "react-router-dom";
import { useStateValue } from "../stateProvider";
import { db, storage } from "../firebase";
import DeleteIcon from "@material-ui/icons/Delete";
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
  where,
  getDoc,
} from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
function Cart() {
  const [{ basket }, dispatch] = useStateValue();
  // const [{ user }] = useStateValue();
  const [promoCode, setPromocode] = useState(false);
  const [cart, setCart] = useState([]);
  var [products] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [user, setUser] = useState({});
  const [bookId, setBookId] = useState([]);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const fetchData = async () => {
    const userId = (await user) ? user.uid : null;
    if (userId) {
      const q = await query(
        collection(db, "cart"),
        where("userId", "==", userId)
      );
      onSnapshot(q, (snapshot) => {
        setCart(snapshot.docs.map((doc) => doc));
      });
    }
  };

  const subTotal = async () => {
    let sum = 0;

    cart.forEach((element) => {
      let price = parseInt(element.data().price);
      sum += price;
    });
    setTotal(sum);
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  useEffect(() => {
    subTotal();
  }, [cart]);

  const deletItem = async (id) => {
    await deleteDoc(doc(db, "cart", id));
  };
  // const addTotalAmount = async () => {
  //   setTotalAmount(total + 25)

  // };
  // useEffect(() => {
  //   addTotalAmount();
  // }, [tax]);
  return (
    <div className="cart container">
      <div className="path ">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <p>Home </p>
        </Link>
        <ArrowForwardIosIcon id="path__icon" />
        <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
          <p>Cart </p>
        </Link>
      </div>
      <div className="cart__content">
        {/* <button onClick={()=>console.log(user.uid)}>CHECK</button> */}
        <div className="cart__header">
          <h3>
            Your Cart <span>{cart.length}</span> Items
          </h3>
        </div>
        {cart.length ? (
          <>
            <div className="cart__table">
              <table>
                <tr className="table__row">
                  <th id="product__th">Product</th>
                  <th id="price__th">Price</th>
                  <th id="qty__th">Qty</th>
                  <th id="total__th">Total</th>
                  <th id="total__th">Action</th>
                </tr>

                {cart.map((data, index) => {
                  // total = total + data.data().price

                  // total +  data.data().price
                  return (
                    <tr key={index}>
                      <td id="cart__td">
                        <div className="cart__item">
                          <img src={data.data().thumbnail} />
                          <div className="cart__item__name">
                            <h6>{data.data().name}</h6>
                            <p>{data.data().author}</p>
                          </div>
                        </div>
                      </td>
                      <td id="table__td">
                        <h6>
                          ₹<span>{data.data().price}</span>{" "}
                        </h6>
                      </td>
                      <td id="table__td">
                        <h6>{data.quantity}</h6>
                      </td>
                      <td id="table__td">
                        <h6>
                          ₹<span>{data.data().price}</span>
                        </h6>
                      </td>
                      <td id="table__td">
                        <DeleteIcon onClick={() => deletItem(data.id)} />
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>

            {/* <<<<<<<<< TOTAL SECTOIN */}

            <div className="total__section">
              <Container>
                <Row>
                  <Col md="4"></Col>
                  <Col id="total__col">
                    <div className="cart__total">
                      <div className="total__row">
                        <h6>Sub Total :</h6>
                        <div className="total__row__right">
                          <h6>
                            ₹<span>{total}</span>
                          </h6>
                        </div>
                      </div>
                      {/* <div className="total__row">
                    <h6>Tax (18%) :</h6>
                    <div className="total__row__right">
                      <h6>
                        ₹<span>{tax}</span>
                      </h6>
                    </div>
                  </div> */}
                      <div className="total__row">
                        <h6>Shipping Charge :</h6>
                        <div className="total__row__right">
                          <h6>
                            ₹<span>50</span>
                          </h6>
                        </div>
                      </div>
                      <div className="total__row">
                        <p>Amount to Pay :</p>
                        <div className="total__row__right">
                          <h5>
                            ₹<span>{total + 50}</span>
                          </h5>
                        </div>
                      </div>

                      <div className="promo__code">
                        <p
                          onClick={() => setPromocode(!promoCode)}
                          type="button"
                        >
                          Do you have a promo code ?
                        </p>
                        {promoCode ? (
                          <div className="promo__child">
                            <input placeholder="ENTER CODE" />
                            <Button id="promo__apply__button">APPLY</Button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>

            <div className="cart__order">
              <Row>
                <Col id="button__col" sm>
                  <button id="help__button">Get Help</button>
                </Col>
                <Col id="button__col" sm>
                  <Link
                    to="/confirm"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button id="order__button">ORDER NOW</Button>
                  </Link>
                </Col>
              </Row>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <Featur />
    </div>
  );
}

export default Cart;

// const addTax = () => {
//   setTax((total * 18) / 100);
// };
// useEffect(() => {
//   addTax();
// }, [total]);
