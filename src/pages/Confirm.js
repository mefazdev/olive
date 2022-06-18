import React, { useEffect, useState } from "react";
import Featur from "../components/Featur";
import "../style/css/confirm.css";
import { Link, useHistory } from "react-router-dom";
import shortid from 'shortid'
import { db} from "../firebase";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import logo from '../images/logo.png'
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
 
import moment from "moment";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Header from "../components/Header";

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = async () => {

      
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const __DEV__ = document.domain === 'localhost'
function Confirm() {   
   
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState([]);
  const [total, setTotal] = useState();
  const history = useHistory();
  const [onlinePayment, setOnlinePayment] = useState(Boolean);
  const [cod, setCod] = useState(Boolean);
  const [payment, setPayment] = useState("cod");
 const [order,setOrder]  = useState([])
   
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const fetchData = async () => {
    // const userId = await user?.uid;
    const q = await query(
      collection(db, "cart"),
      where("userId", "==", user?.uid)
    );
    onSnapshot(q, (snapshot) => {
      setCart(snapshot.docs.map((doc) => doc));

      // console.log(snapshot.docs.map((doc) => doc.data()));
    });
    // }
  };

  const deletCart = async ()=>{
   cart.map((data)=>{
   
       deleteDoc(doc(db, "cart", data.id));
    
   })
  }
  const fetchAddress = async () => {
    const userId = await user?.uid;
    if (user) {
      const q = await query(
        collection(db, "address"),
        where("userID", "==", userId)
      );
      onSnapshot(q, (snapshot) => {
        setAddress(snapshot.docs.map((doc) => doc));
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
    fetchAddress();
  }, [user]);
  useEffect(() => {
    subTotal();
    addOrder()
  }, [cart]);


  function onChangeValue(event) {
    setPayment(event.target.value);
    // console.log(event.target.value);
  }
  const deletAddress = async (id) => {
    await deleteDoc(doc(db, "address", id));
  };


 

  const addOrder  = ()=>{
    let order = [];

    cart.forEach((element) => {
      order = [...order,element.data()]

      // sum += price;     
    });
    setOrder(order);
  }
  const passOrder = async()=>{
     const orderId = shortid.generate()
    await addDoc(collection(db, "order"), {
      userId: user.uid,
      order:order,
      paymentType:payment,
      status:'Not Shipped',
      total:total+50,
      orderId:orderId,
      recivedDate: moment(new Date()).unix(),
      timestamp: serverTimestamp(),

      // data:data
   }) 
deletCart()
   history.push('/orderConfirm')

  }



  async function displayRazorpay() {
  //  await getRazorpayData()
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

    const data = await axios.post('https://olive-razorpay.herokuapp.com/razorpay',{amount:total+50})
    

  

		const options = {
			key: __DEV__ ? 'rzp_test_jJU3IWM6KLcJEH' : 'PRODUCTION_KEY',
			currency: 'INR',
			amount:data.data.amount,
			order_id:data.data.id,
			name: 'Olive Books',
			description: 'pvt limited',
			image: {logo},
			handler: function (response) {
				// alert(response.razorpay_payment_id)
				// alert(response.razorpay_order_id)
				// alert(response.razorpay_signature)
        passOrder()
        //  deletCart()
       
			},
			prefill: {
				name:'',
				email: '',
				phone_number: ''
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}

  
  return (
    <>
    <Header/>
    
    <div className="container">
      <div className="fullbody">
         {/* <button onClick={()=>console.log(order)}>onclick</button> */}
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

                {cart.map((data, index) => {
                  let p = parseInt(data.data().price);
                  let q = parseInt(data.data().quantity);
                  const total = p * q;
                  // let total = 30
                  return (
                    // <Link
                    // to={`/book/`}  key={index}
                    // >
                    <tr key={index}>
                      <td id="cart__td">
                        <Link to={`/book/${data.data().bookId}`} key={index}>
                          <div className="cart__item">
                            <img src={data.data().thumbnail} />
                            <div className="cart__item__name">
                              <h6>{data.data().name}</h6>
                              <p>{data.data().author}</p>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td id="table__td">
                        <h6>
                          ₹<span>{data.data().price}</span>{" "}
                        </h6>
                      </td>
                      <td id="table__td">
                        <h6>{data.data().quantity}</h6>
                      </td>
                      <td id="table__td">
                        <h6>
                          ₹<span>{total}</span>
                        </h6>
                      </td>
                    </tr>
                    // </Link>
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

            {address.length == 1 ? (
              <>
                {address.map((data, index) => {
                  if (index < 1) {
                    return (
                      <div
                        key={index}
                        className="data-container2"
                        style={{
                          background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                        }}
                      >
                        <div className="name-header">
                          <div className="name-container">
                            <p
                              className="name"
                              // onClick={()=>console.log('hi>>>',newAddress)}
                            >
                              {data.data().name}
                            </p>
                            <div className="icon-container">
                              {/* <Link to="/editAdress">
                         <img
                           className="edit-icon"
                           src={process.env.PUBLIC_URL + "/images/edit_icon.png"}
                           alt="edit-icon"
                         />
                       </Link> */}

                              <img
                                onClick={() => deletAddress(data.id)}
                                className="delete-icon"
                                src={
                                  process.env.PUBLIC_URL +
                                  "/images/delete_icon.png"
                                }
                                alt="delete-icon"
                              />
                            </div>{" "}
                          </div>
                        </div>
                        <div className="data-box2">
                          <p className="data">
                            House No : {data.data().houseNo}
                          </p>
                          <p className="data">{data.data().address} </p>
                          <p className="data">{data.data().town}</p>
                          <p className="data">{data.data().district}</p>
                          <p className="data">{data.data().state}</p>
                          <p className="data">India, {data.data().pin}</p>
                        </div>
                      </div>
                    );
                  }
                })}{" "}
              </>
            ) : (
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/addAddress"
              >
                <div
                  className="add-container"
                  style={{
                    background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                  }}
                >
                  <img
                    className="add-image"
                    src={process.env.PUBLIC_URL + "/images/add.png"}
                    alt="add-icon"
                  />

                  <p>ADD ADDRESS</p>
                </div>
              </Link>
            )}
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
                <p className="amount-title2">Sub Total : </p>
                {/* <p className="amount-title2">Tax (18%) :</p> */}
                <p className="amount-title2">Shipping Charge :</p>
                <p className="amount-total1">TOTAL</p>
              </div>
              <div className="amount-price1">
                <p className="amount-price2">₹ {total}</p>
                {/* <p className="amount-price2">₹ 225</p> */}
                <p className="amount-price2">₹ 50</p>
                <p className="amount-total2">₹ {total + 50}</p>
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
            <div onChange={onChangeValue} className="radio-container">
              <input
             
                checked={payment === "cod"}
                type="radio"
                value="cod"
                name="mode"
                id="cod"
              ></input>
              <label for="cod">Cash On delivery</label>
              <br></br>

              <input
                checked={payment === "online"}
                type="radio"
                name="mode"
                value="online"
                id="online"
              ></input>
              <label for="online">Online</label>
            </div>
          </div>

          <div className="confirmbtn-container">
            {/* <Link
              to="/orderConfirm"
              style={{ textDecoration: "none", color: "inherit" }}
            > */}
            <button
            disabled={cart.length == 0  ? true : false}
            // disabled={false}
              onClick={payment == 'cod' ? passOrder: payment == 'online'?  displayRazorpay : ''}
              className="confirm-btn"
              type="button"
            >
              CONFIRM
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
      <Featur />
    </div> </>
  );
}

export default Confirm;
