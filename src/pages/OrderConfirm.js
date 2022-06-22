import React, { useEffect, useState } from "react";

import Featur from "../components/Featur";
import "../style/css/orderConfirm.css";
 
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import Header from "../components/Header";
import { auth, db  } from "../firebase";
import { collection, orderBy,updateDoc,doc, query, getDocs,where } from "@firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Footer from "../components/Footer";
import voucherCode from 'voucher-code-generator'
import { Button, Toast, ToastContainer } from "react-bootstrap";

function OrderConfirm() {
  const [bestSeller, setBestSeller] = useState([]);

   const [offerCount, setOfferCount] = useState([])
  const [user, setUser] = useState({});
  var [filteredData] = useState([]);

  const [finalDocs, setFinalDocs] = useState([]);
  const [toast,setTaost] = useState(false)
  onAuthStateChanged(auth, (currentUser) => {  
    setUser(currentUser);
  });

   
  let f = voucherCode.generate({
    length: 5,
    count: 1
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
  useEffect(()=>{
    fetchOfferCount()
  },[user])

  const fetchOfferCount = async()=>{
    const q = await query(
      collection(db, "offerCount"),
      where("userId", "==", user?.uid)
    );
    const docSnap = await getDocs(q);
    setOfferCount(docSnap.docs.map((doc) => doc));
  }

  const sendPromoCode = async () =>{
    if(  offerCount[0]?.data().count >= 5 ){
      openToast()
      
      const docRef = doc(db, 'offerCount',offerCount[0].id);
      updateDoc(docRef, {
        count : 0,
        sentCode: true,
        promoCode: f[0]
      })
    }
  }


  const openToast = ()=> setTaost(true)
  useEffect(()=>{
    sendPromoCode()
  },[offerCount])
  return (
    <>
      <Header />

      {/* <ToastContainer
       onClose={''}
       show={true}
       delay={3000}
       autohide
       position='top-center'> */}
      <Toast
       onClose={()=>setTaost(false)}
       show={toast}
       delay={3000}
       autohide  
       id='code__success__toast' 
      
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Olive Books</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body>
           You have an offer!, We sent a promo code to your email
            
          </Toast.Body>
        </Toast>
        {/* </ToastContainer> */}
      <div className="container">
        <div className="body">
          <div className="container9 container">

            {/* <button onClick={openToast}> click</button> */}
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
      </div>
      
      <Footer />


      

    </>
  );
}

export default OrderConfirm;
