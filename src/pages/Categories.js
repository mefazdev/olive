import "../style/css/categories.css";
import "./../style/css/justArrived.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SearchIcon from "@material-ui/icons/Search";
import book from "../images/book-read.png";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Featur from "../components/Featur";
import { useEffect, useState } from "react";
import pop1 from "../images/popular/pop1.jpg";
import pop2 from "../images/popular/pop2.jpg";
import pop3 from "../images/popular/pop3.jpg";
import pop4 from "../images/popular/pop4.jpg";
import pop6 from "../images/popular/pop6.jpg";
import pop8 from "../images/popular/pop8.jpg";
import PopularList from "../components/PopularList";
import UsePagination from "../components/Pagination";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import FilterSearch from "../components/FilterSearch";
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

function Categories() {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState([])
  const [openFilter, setOpenFilter] = useState(false);
  const fetchData = async () => {
    const q = await query(
      collection(db, "categories"),
      orderBy("timestamp", "desc")
    );
        const data =   await getDocs(q)
        setCategory(data.docs.map((doc) => doc));
  };
  useEffect  (()=>{
    fetchData()
  },[])
  return (
    <div className="categories container">
      <div className="path ">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <p>Home </p>
        </Link>

        <ArrowForwardIosIcon id="path__icon" />
        <Link
          to="/categories"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <p>Categories </p>
        </Link>

        {/* <ArrowForwardIosIcon id="path__icon" />
        <p> Friction</p> */}
      </div>

      <div className="categories__content">
         
            <div className="categories__right">
              <img id="categories__right__img" className="col-12" src={book} />

              {/* <div className="categories__head__row ">
                <h5>Friction</h5>
                <p>5000 Books</p>
              </div> */}
             
              <Row>
                {category.map((data,index) => {

                  return (
                    <Col xs="6" sm="4" md="2">
                      <div className="book__item">
                        <Link
                         to={`/books/${data.id}`}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <img src={data.data().image} />
                        </Link>
                        <Link
                          to="/bookSingle"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <div className="book__item__name">
                            <h6>{data.data().title}</h6>
                          
                          </div>
                        </Link>
                                             </div>
                    </Col>
                  );
                })}
              
              </Row>
            </div>
          
      </div>
      

      <Featur />
    </div>
  );
}

export default Categories;
