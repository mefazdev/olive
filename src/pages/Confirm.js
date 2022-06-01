import React, { useState } from "react";
import Featur from "../components/Featur";
import "../style/css/confirm.css";
import { Link } from "react-router-dom";
import cart1 from "../images/cart/cart1.png";
import cart2 from "../images/cart/cart2.png";
import cart3 from "../images/cart/cart3.png";
import sample1 from "../images/cart/review.png";
import sample2 from "../images/cart/paulo.png";
function Confirm() {
  const [review] = useState([
    {
      name: "Rising Like a Storm ",
      author: "Tanaz Bhathena",
      image: sample1,
      price: 450,
      quantity: 1,
      total: 450,
    },
    {
      name: "Conflicts of Intrest",
      author: "Sunita Narain",
      image: sample2,
      price: 150,
      quantity: 2,
      total: 300,
    },
    {
      name: "Right Between the Ears",
      author: "Sandeep Dayal",
      image: cart2,
      price: 510,
      quantity: 1,
      total: 510,
    },
  ]);
  return (
    <div className="container">
      <div className="fullbody">
        <div className="total-container container">
          <div className="review-container">
            <div className="review-list">
              <img
                className="list-icon"
                src={process.env.PUBLIC_URL + "/images/list1.svg"}
                alt="list_icon"
              />
              <p className="review-title">Review Products</p>
            </div>
            <div className="cart__table">
              <table>
                <tr className="table__row">
                  <th id="product__th">Product</th>
                  <th id="price__th">Price</th>
                  <th id="qty__th">Qty</th>
                  <th id="total__th">Total</th>
                </tr>

                {review.map((data) => {
                  return (
                    <tr>
                      <td id="cart__td">
                        <div className="cart__item">
                          <img src={data.image} />
                          <div className="cart__item__name">
                            <h6>{data.name}</h6>
                            <p>{data.author}</p>
                          </div>
                        </div>
                      </td>
                      <td id="table__td">
                        <h6>
                          ₹<span>{data.price}</span>{" "}
                        </h6>
                      </td>
                      <td id="table__td">
                        <h6>{data.quantity}</h6>
                      </td>
                      <td id="table__td">
                        <h6>
                          ₹<span>{data.total}</span>
                        </h6>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>

          <div className="shipping-container">
            <div className="review-list">
              <img
                className="list-icon"
                src={process.env.PUBLIC_URL + "/images/list2.svg"}
                alt="list_icon"
              />
              <p className="review-title">Shipping Address</p>
            </div>

            <div
              className="data-container2"
              style={{
                background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
              }}
            >
              <div className="name-header">
                <div className="name-container">
                  <p className="name">Joseph P</p>
                  <div className="icon-container">
                    <Link to="/editAdress">
                      <img
                        className="edit-icon"
                        src={process.env.PUBLIC_URL + "/images/edit_icon.png"}
                        alt="edit-icon"
                      />
                    </Link>

                    <a href="#">
                      <img
                        className="delete-icon"
                        src={process.env.PUBLIC_URL + "/images/delete_icon.png"}
                        alt="delete-icon"
                      />
                    </a>
                  </div>{" "}
                </div>
              </div>
              <div className="data-box2">
                <p className="data">House No: 12,</p>
                <p className="data">Palayam </p>
                <p className="data">Road,</p>
                <p className="data">Kozhikod</p>
                <p className="data">Kerala</p>
                <p className="data">India, 6703001</p>
              </div>
            </div>
          </div>

          <div className="amount-container">
            <div className="review-list">
              <img
                className="list-icon"
                src={process.env.PUBLIC_URL + "/images/list3.svg"}
                alt="list_icon"
              />
              <p className="review-title">Amount Breakdown</p>
            </div>
            <div className="all-amount">
              <div className="amount-title1">
                <p className="amount-title2">Sub Total :</p>
                <p className="amount-title2">Tax (18%) :</p>
                <p className="amount-title2">Shipping Charge :</p>
                <p className="amount-total1">TOTAL</p>
              </div>
              <div className="amount-price1">
                <p className="amount-price2">₹ 1250</p>
                <p className="amount-price2">₹ 225</p>
                <p className="amount-price2">₹ 25</p>
                <p className="amount-total2">₹ 1500</p>
              </div>
            </div>
          </div>

          <div className="payment-container">
            <div className="review-list">
              <img
                className="list-icon"
                src={process.env.PUBLIC_URL + "/images/list4.svg"}
                alt="list_icon"
              />
              <p className="review-title">Payment Mode</p>
            </div>
            <div className="radio-container">
              <input type="radio" name="mode" id="cod"></input>
              <label for="cod">Cash On delivery</label>
              <br></br>

              <input type="radio" name="mode" id="online"></input>
              <label for="online">Online</label>
            </div>
          </div>

          <div className="confirmbtn-container">
            <Link
              to="/orderConfirm"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <button className="confirm-btn" type="button">
                CONFIRM
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Featur />
    </div>
  );
}

export default Confirm;
