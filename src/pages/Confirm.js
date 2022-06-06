import React, { useEffect, useState } from "react";
import Featur from "../components/Featur";
import "../style/css/confirm.css";
import { Link,useHistory } from "react-router-dom";
import cart1 from "../images/cart/cart1.png";
import cart2 from "../images/cart/cart2.png";
import cart3 from "../images/cart/cart3.png";
import sample1 from "../images/cart/review.png";
import sample2 from "../images/cart/paulo.png";
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
const [user,setUser] = useState({})
const [cart,setCart] = useState([])
const [address, setAddress] = useState([])
const [total, setTotal] = useState()
const history = useHistory()
const [onlinePayment,setOnlinePayment] = useState(Boolean)
const [cod, setCod]  = useState(Boolean)
const [payment, setPayment] = useState('')
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
      setCart(snapshot.docs.map((doc) => doc.data()));

      // console.log(snapshot.docs.map((doc) => doc.data()));
    });
    // }
  };
  const fetchAddress = async () => {
    const userId = await user?.uid
    if(user){
      const q = await query(
        collection(db, "address"),
        where("userID", "==", userId)
      );
      onSnapshot(q, (snapshot) => {
        setAddress(snapshot.docs.map((doc) => doc));
  
        
      });
    
    };
    }

    const subTotal = async () => {
      let sum = 0;
  
      cart.forEach((element) => {
        let price = parseInt(element.price);
        sum += price;
      });
      setTotal(sum);
    };


    const makeOrder = ()=>{
     if(payment === 'cod'){
       history.push('/orderConfirm')
     }
    }
useEffect(()=>{
  fetchData()
  fetchAddress()
},[user])
useEffect(() => {
  subTotal();
}, [cart]);
function onChangeValue(event) {
  setPayment(event.target.value);
  // console.log(event.target.value);
}
const deletAddress = async (id)=>{
  await deleteDoc(doc(db, "address", id));
}
  return (
    <div className="container">
      <div className="fullbody">
        <button onClick={()=>console.log("hiii>",onlinePayment)}>CHECK</button>
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

                {cart.map( (data,index) => {
                  let p = 
                   parseInt (data.price)
                  let q = 
                  parseInt(data.quantity)
                  const total = p*q
                  // let total = 30
                  return (
                    // <Link 
                    // to={`/book/`}  key={index}
                    // >
<tr >
                      <td id="cart__td">
                      <Link 
                    to={`/book/${data.bookId}`}  key={index}
                    >
                        <div className="cart__item">
                          <img src={data.thumbnail  } />
                          <div className="cart__item__name">
                            <h6>{data.name}</h6>
                            <p>{data.author}</p>
                          </div>
                        </div>
                        </Link>
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

            {address.length == 1 ? <>
           {address.map((data,index)=>{
             
              if(index < 1){
                return(

                 <div
                 key={index}
                 className="data-container2"
                 style={{
                   background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                 }}
               >
                 <div className="name-header">
                   <div className="name-container">
                     <p className="name" 
                     // onClick={()=>console.log('hi>>>',newAddress)}
                     >{data.data().name}</p>
                     <div className="icon-container">
                       {/* <Link to="/editAdress">
                         <img
                           className="edit-icon"
                           src={process.env.PUBLIC_URL + "/images/edit_icon.png"}
                           alt="edit-icon"
                         />
                       </Link> */}
       
                     
                         <img
                         onClick={()=>deletAddress(data.id)}
                           className="delete-icon"
                           src={process.env.PUBLIC_URL + "/images/delete_icon.png"}
                           alt="delete-icon"
                         />
                        
                     </div>{" "}
                   </div>
                 </div>
                 <div className="data-box2">
                   <p className="data">House No : {data.data().houseNo}</p>
                   <p className="data">{data.data().address} </p>
                   <p className="data">{data.data().town}</p>
                   <p className="data">{data.data().district}</p>
                   <p className="data">{data.data().state}</p>
                   <p className="data">India, {data.data().pin}</p>
                 </div>
               </div>
               
                )
                      }
            }) } </>  :<Link style={{textDecoration:'none',color:'inherit'}} to="/addAddress">
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
            </Link>}

            
            
            
            
    
           
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
              <p className="amount-total2">₹ {total+50}</p>
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
              <input checked={payment === 'cod'}  type="radio" value='cod' name="mode" id="cod"></input>
              <label for="cod">Cash On delivery</label>
              <br></br>

              <input
              checked={payment === 'online'}
              type="radio" name="mode" value='online' id="online"></input>
              <label  for="online">Online</label>
            </div>
          </div>

          <div className="confirmbtn-container">
            {/* <Link
              to="/orderConfirm"
              style={{ textDecoration: "none", color: "inherit" }}
            > */}
              <button onClick={makeOrder} className="confirm-btn" type="button">
                CONFIRM
              </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
      <Featur />
    </div>
  );
}

export default Confirm;
