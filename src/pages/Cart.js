import "../style/css/cart.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button } from "@material-ui/core";
import Featur from "../components/Featur";
import { Link } from "react-router-dom";
import { useStateValue } from "../stateProvider";
import { db, storage } from "../firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  doc,
  deleteDoc,
  where,updateDoc
} from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Footer from "../components/Footer";
import { auth } from "../firebase";
import Header from "../components/Header";
import { Toast  } from "react-bootstrap";
function Cart() {
  const [{ basket }, dispatch] = useStateValue();
   const [code,setCode] = useState()
  const [promoCode, setPromocode] = useState(false);
  const [cart, setCart] = useState([]);
  var [products] = useState([]);
  const [total, setTotal] = useState(0);
 const [done,setDone] = useState('APPLY')
  const [user, setUser] = useState({});
  const [toast1,setTaost1] = useState(false)
  const [toast2,setTaost2] = useState(false)
const [offerCount,setOfferCount] = useState([])
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
    let q = 0;
    cart.forEach((element) => {
      let price = parseInt(element.data().price * element.data().quantity);
      let quantity = parseInt(element.data().quantity);
      q += quantity;
      sum += price;
    });
    setTotal(sum);
  };

  useEffect(() => {
    fetchData();
    fetchOfferCount()
  }, [user]);

  useEffect(() => {
    subTotal();
  }, [cart]);

  const deletItem = async (id) => {
    await deleteDoc(doc(db, "cart", id));
  };

  const applyCode = async  ()=>{
   if(code == offerCount[0].data().promoCode){
    
    setDone ('DONE')
     
    if (offerCount[0].data().sentCode === true){

      if(cart[0].data().offerZone === true && cart.length <= 1){
        const docRef = doc(db, 'cart',cart[0].id);
        await  updateDoc(docRef, {
           price:0
        })
        const offerRef = doc(db, 'offerCount',offerCount[0].id);
        await  updateDoc(offerRef, {
           sentCode:false
        })
      }else{
      setTaost1(true)
        // alert('Please select only one book from offerzone ')
      }
    }else{
    //  alert('You havnt offer')
    setTaost2(true) 
    }
   
     

   }else{
   setDone('Not available')
   }
  }


  const fetchOfferCount = async()=>{
    const q = await query(
      collection(db, "offerCount"),
      where("userId", "==", user?.uid)
    );
    const docSnap = await getDocs(q);
    setOfferCount(docSnap.docs.map((doc) => doc));
  }
  const controlChange = (e)=>{
    setCode(e)
    setDone('APPLY')
  }

  const openToast1 =()=> setTaost1(true)
  const openToast2 = ()=> setTaost2(false  )
  return (
    <>
      <Header />
      <Toast
      //  onClose={()=>setTaost1(false)}
       show={toast1}
       delay={3000}
       autohide  
       id='toast1' 
      
        >
          {/* <Toast.Header>
            
            <strong className="me-auto">Olive Books</strong>
            <small>Just now</small>
          </Toast.Header> */}
          <Toast.Body>
          Please select only one book from offerzone
          <Button
          id='toast1__btn'
          onClick={()=>setTaost1(false)}
          style={{ marginLeft: "10px", }}>OK</Button>
          </Toast.Body>
        </Toast>
        <Toast
      //  onClose={()=>setTaost1(false)}
       show={toast2}
       delay={3000}
       autohide  
       id='toast1' 
      
        >
          {/* <Toast.Header>
            
            <strong className="me-auto">Olive Books</strong>
            <small>Just now</small>
          </Toast.Header> */}
          <Toast.Body>
         You have'nt the offer!
          <Button
          id='toast1__btn'
          onClick={()=>setTaost2(false)}
          style={{ marginLeft: "10px", }}>OK</Button>
          </Toast.Body>
        </Toast>
      <div className="cart container">
        
        <div className="path ">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <p>Home </p>
          </Link>
          <ArrowForwardIosIcon id="path__icon" />
          <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
            <p>Cart </p>
          </Link>

          {/* <button onClick={()=>console.log(offerCount[0]?.data().userId)}>CHECK</button> */}
        </div>
        <div className="cart__content">
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
                          <h6>{data.data().quantity}</h6>
                        </td>
                        <td id="table__td">
                          <h6>
                            ₹
                            <span>
                              {data.data().price * data.data().quantity}
                            </span>
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
                              <input
                              value={code}
                              onChange={(e)=>controlChange(e.target.value)}
                              placeholder="ENTER CODE" />
                              <Button id="promo__apply__button" onClick={applyCode}>
                                {/* {done ? 'DONE' : 'APPLY'} */}
                                {done}
                           </Button>
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
      </div>{" "}
      <Footer />{" "}
      

      
    </>
  );
}

export default Cart;
