import { useState } from "react";
import "../style/css/cart.css";
import "../style/css/orderDownload.css";
import cart1 from "../images/cart/cart1.png";
import cart2 from "../images/cart/cart2.png";
import { Button } from "@material-ui/core";
import Featur from "../components/Featur";
function OrderDownload() {
  const [cart] = useState([
    {
      name: "Rising Like a Storm",
      author: "Tanaz Bhathena",
      image: cart1,
      price: 450,
      quantity: 1,
      total: 450,
    },
    {
      name: "Conflicts of Intrest",
      author: "Sunita Narain",
      image: cart2,
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
    <div className="order__down container">
      <div className="order__down__content">
        <div className="order__down__product">
          <div className="order__down__head">
            <span className="order__down__round">
              <p>1</p>
            </span>
            <h5>Products</h5>
          </div>

          {/* <<<<<<<<<<< PRODUCT TABLE >>>>>>>>>>> */}
          <div className="cart__table">
            <table>
              <tr className="table__row">
                <th id="product__th">Product</th>
                <th id="price__th">Price</th>
                <th id="qty__th">Qty</th>
                <th id="total__th">Total</th>
              </tr>

              {cart.map((data) => {
                return (
                  <tr>
                    <td>
                      <div className="cart__item">
                        <img src={data.image} />
                        <div>
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

        {/* <<<<<<<< ADDRESS >>>>>>>>>>>>>> */}

        <div className="order__down__address">
          <div className="order__down__head">
            <span className="order__down__round">
              <p>2</p>
            </span>
            <h5>Address</h5>
          </div>

          <div className="order__down__adress__box">
            <div className="order__down__adress__content">
              <h6>Joseph P</h6>
              <p>House No: 12,</p>
              <p>Palayam Road,</p>
              <p> Kozhikode</p>
              <p>Kerala </p>
              <p>India, 673001</p>
            </div>
          </div>
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
                  <p>₹ 1250</p>
                </div>
              </div>
              <div className="order__down__amount__row">
                <div className="order__down__amount__left">
                  <p>Tax (18%) :</p>
                </div>
                <div className="order__down__amount__right">
                  <p>₹ 225</p>
                </div>
              </div>
              <div className="order__down__amount__row">
                <div className="order__down__amount__left">
                  <p>Shipping Charge :</p>
                </div>
                <div className="order__down__amount__right">
                  <p>₹ 25</p>
                </div>
              </div>
              <div className="order__down__amount__row">
                <div className="order__down__amount__left">
                  <h6>TOTAL</h6>
                </div>
                <div className="order__down__amount__right">
                  <h5>₹1500</h5>
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
                  <p>12-12-2020</p>
                </div>
                <div className="order__down__status__right">
                  <p>Order Received</p>
                </div>
              </div>
              <div className="order__down__status__row">
                <div className="order__down__status__left">
                  <p>13-12-2020</p>
                </div>
                <div className="order__down__status__right">
                  <p>Shipped</p>
                </div>
              </div>
              <div className="order__down__status__row">
                <div className="order__down__status__left">
                  <p>18-12-2020</p>
                </div>
                <div className="order__down__status__right">
                  <p>Delivered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <<<<<<<<<<<<< DOWNLOAD BUTTON >>>>>>>>>>>>>>> */}
        <div className="order__down__button">
          <Button id="order__download__button">DOWNLOAD </Button>
        </div>
      </div>

      <Featur />
    </div>
  );
}

export default OrderDownload;
