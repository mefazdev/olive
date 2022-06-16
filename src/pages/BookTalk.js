import React, { useEffect, useState } from "react";
import Featur from "../components/Featur";
import UsePagination from "../components/Pagination";
import "../style/css/blog.css";
import ReactStars from "react-rating-stars-component";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import { collection,addDoc, getDoc,where,  serverTimestamp, doc, orderBy, query, getDocs } from "@firebase/firestore";
import Moment from 'moment'
import { db } from "../firebase";
import { auth } from "../firebase";
// import Header from '../components/Header'
import { onAuthStateChanged } from "firebase/auth";
import Header from "../components/Header";
function Blog() {

  const [bookTalk,setBookTalk] = useState({})
  const [book,setBook] = useState([])
  const id = useParams();
  const [isReadMore, setIsReadMore] = useState(true);
  const [user, setUser] = useState({});
  const [quantity, setQuantity] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const fetchBookTalk = async () => {
    const docRef = doc(db, "bookTalk", id.id);
    const docSnap = await getDoc(docRef);
   

    setBookTalk(docSnap.data() );
    // console.log(docSnap.data())
  };


  const fetchBook = async () => {
    // const docRef = doc(db, "products",);
    const docRef = await query(
      collection(db, "products"),
      where("name", "==", "Rising Like a Storm")
    );
    const docSnap = await getDocs(docRef);
console.log("jjjjj>>>",docSnap )
    setBook(docSnap.docs.map((doc) => doc));
  };

  useEffect(()=>{
    fetchBookTalk()
  },[id])


  useEffect(()=>{
    fetchBook()
  },[ ])

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const addToCart = async (price,bookId,image,name,author) => {
    setQuantity(true);
    if (!quantity) {
      await addDoc(collection(db, "cart"), {
        quantity: 1,
        userId: user.uid,
        bookId: id,
        thumbnail: image,
        name: name,
        author: author,
        price: price,
        timestamp: serverTimestamp(),
        // data:data
      });
    }
  };
  return (
    <>
    <Header/>
    <div className="container">
      <div className="body">
        <div className="blog-container">
          <div className="about">
            <img
              className="blog-img"
              src={process.env.PUBLIC_URL + "/images/book.jpg"}
              alt="book_image"
            />
          </div>
          <div className="top-layer">
            <div className="text-container">
                   {/* <button onClick={()=>console.log('hhh>>>',book)} >CLICK</button> */}
              <h2>
                Why should you read <span>{  bookTalk.book  }</span>
              </h2>
              

               <h6>1. {  bookTalk.title1   } </h6>
              <p>
               {bookTalk.content1}
              </p>

              <h6>2. {bookTalk.title2}</h6>
              <p>
                {bookTalk.content2}
              </p>

              <h6>3. {bookTalk.title3}</h6>
              <p>
                {bookTalk.content3}
              </p>

              <h6>4.{bookTalk.title4}</h6>
              <p>
                {bookTalk.content4}
              </p>

              <h6> 5. {bookTalk.title5}</h6>
              <p>
              {bookTalk.content5}              </p>
              <h6>6. {bookTalk.title6}</h6>
              <p>
                {bookTalk.content6}
              </p>  
                
            </div>
            <Container>
              {book.map((data,index)=>{
                const description = data.data().description
                const price = data.data().price
                const name = data.data().name
                const author = data.data().author
                const image = data.data().thumbnail
                const bookId = data.id
                return(
                  <div className="buynow ">
                  <Row>
                    <Col md="4">
                      <div className="buy-book">
                        <img
                          className="book-front col-12"
                          src={data.data().thumbnail}
                          // src={process.env.PUBLIC_URL + "/images/pc_book.jpg"}
                          alt="edit-icon"
                        />
                        <button
                        onClick={()=>addToCart(price,bookId,image,name,author,)}
                        className="buy-btn">BUY NOW</button>
                      </div>
                    </Col>
  
                    <Col md="8">
                      <div className="description">
                        <h5 className="book-title">{data.data().name}</h5>
                        <div className="rating">
                          {/* <div style={{ display: "flex", alignItems: "center" }}> */}
                            {/* <ReactStars
                              id="review__stars"
                              count={5}
                              value={5}
                              size={24}
                              activeColor="#ffd700"
                            /> */}
  
                            {/* <h6> (274)</h6> */}
                          {/* </div> */}
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <h6>By </h6>
  
                            <p>{data.data().author}</p>
                          </div>
                        </div>
  
                        <p className="book-price">₹{data.data().price}</p>
                        <div className="description-text">
                          <p>
                          {isReadMore ? description.slice(0, 700) : description}
                         
                            <button onClick={toggleReadMore} className="read-more">{isReadMore ? "...Read more" : " Show less"}</button>
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                )
              })}
             
            </Container>
          </div>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "90px" }}
      >
        {/* <UsePagination /> */}
      </div>
      <Featur />
    </div></>
  );
}
export default Blog;
