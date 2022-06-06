import "../style/css/categories.css";
import "./../style/css/justArrived.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SearchIcon from "@material-ui/icons/Search";
import book from "../images/book-read.png";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Featur from "../components/Featur";
import { useEffect, useState } from "react";
import best1 from "../images/author/best1.png";
import best2 from "../images/author/best2.png";
import best3 from "../images/author/best3.png";
import best4 from "../images/author/best4.png";
import PopularList from "../components/PopularList";
import UsePagination from "../components/Pagination";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import FilterSearch from "../components/FilterSearch";
import Product from "../components/JustArrivedBook";
import JustArrivedBook from "../components/JustArrivedBook";
import { db, storage } from "../firebase";
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

} from "@firebase/firestore";


function JustArrived() {
  const [show, setShow] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [product, setProduct] = useState([]);
  const styles = { fontSize: "17px", marginRight: "10px" };

  const fetchData = async () => {
    const q = await query(
      collection(db, "products"),
      where("justArrived", "==", true)
    );
    const data = await getDocs(q);
    setProduct(data.docs.map((doc) => doc));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="categories container">
      <div className="path ">
        <p>Home </p>
        <ArrowForwardIosIcon id="path__icon" />
        <p>Categories </p>
        <ArrowForwardIosIcon id="path__icon" />
        <p> Friction</p>
      </div>

      <div className="categories__content">
        <Row>
          {/* <<<<<<<<<<<<<<< FILTER SEARCH >>>>>>>>>>>>>>>>>>> */}
          <FilterSearch />

          {/* Categries right Column */}
          <Col md="10">
            <div className="categories__right">
              <img id="categories__right__img" className="col-12" src={book} />

              <div className="categories__head__row">
                <h5>Just Arrived</h5>
                <p>{product.length}Books</p>
              </div>

              {/* <<<<<<<<< WRONG ALERT >>>>>>>>> */}

              <Row>
                {product.map((data, index) => {
                  return (
                    <Col id={index} xs="6" sm="4" md="2">
                      <Link
                        to={`/book/${data.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <JustArrivedBook
                          name={data.data().name}
                          author={data.data().author}
                          image={data.data().thumbnail}
                          price={data.data().price}
                          cutPrice={data.data().cutPrice}
                          offer={data.data().offer}
                        />
                      </Link>
                    </Col>
                  );
                })}
                <div className="pagination__div">
                  <UsePagination />
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
      <PopularList />

      <Featur />
    </div>
  );
}

export default JustArrived;

{
  /* CART ALERTS */
}

{
  /* {show ? 
               <Alert variant="success" id='alert'>
                
               
                 <CheckCircleIcon id='alert__success__icon'/>
                 
               <div className='alert__success__text'>
               <p>Product added to your cart</p>
               <Link to='/cart' style={{textDecoration:'none'}}>
               <h6>CHECKOUT NOW</h6>
               </Link>
            
               </div>
               
               <CloseIcon type='button' onClick={()=>setShow(false)} id='alert__close__icon' />
               </Alert> :''
            } */
}

{
  /* <<<<<<<< LOGIN ALERT >>>>>>>>>> */
}

{
  /* {show ? 
               <Alert variant="primary" id='login__alert'>
                
               
                 <InfoIcon id='alert__success__icon'/>
                 
               
               <p>Please Login</p>
          
               <h6 type='button' onClick={()=>setShow(false)}>OK</h6>
               
            
             
               </Alert> :''} */
}
