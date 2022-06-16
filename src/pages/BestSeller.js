import "../style/css/categories.css";
import "./../style/css/justArrived.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import book from "../images/book-read.png";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Featur from "../components/Featur";
import { useEffect, useState } from "react";

import PopularList from "../components/PopularList";
import UsePagination from "../components/Pagination";

import { Link } from "react-router-dom";

import FilterSearch from "../components/FilterSearch";
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
import Product from "../components/Product";
import {
  ContactsOutlined,
  FilterDrama,
  RepeatOutlined,
} from "@material-ui/icons";
import Header from "../components/Header";

function BestSeller() {
  const [show, setShow] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  var [filteredData] = useState([]);
  const [finalDocs, setFinalDocs] = useState([]);
  const [startIndex, setStartIndex] = useState(-1)
  const [endIndex, setEndIndex] = useState(49)

  const fetchData = async () => {
    const q = await query(
      collection(db, "products"),
      orderBy("timestamp", "desc")
      // where("bestSeller", "==", true)
    );
    const data = await getDocs(q);
    setProducts(data.docs.map((doc) => doc));
  };

  const filterData = () => {
    products.map((data) => {
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
    // test()
  }, []);
  useEffect(() => {
    filterData();
  }, [products]);


  const nextPage = ()=>{
    setStartIndex( startIndex + 49)
    setEndIndex(endIndex + 49)
  }
  const prevPage = ()=>{
    if(startIndex >= 48){
      setStartIndex( startIndex - 49)
      setEndIndex(endIndex - 49)
    }
     
  }
  return (
    <>
    <Header/>
    <div className="categories container">
      <div className="path ">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <p>Home </p>
        </Link>

        <ArrowForwardIosIcon id="path__icon" />
        <Link
          to="/bestSeller"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <p>Best seller</p>
          
          {/* <button onClick={()=>console.log(docn)} >CLICKMEj</button> */}
        </Link>
      </div>

      <div className="categories__content">
        <Row>
          {/* <<<<<<<<<<<<<<<  FILTER SEARCH SECTION >>>>>>>>>>>>>> */}
          <FilterSearch />

          {/* Categries right Column */}
          <Col md="10">
            <div className="categories__right">
              <img id="categories__right__img" className="col-12" src={book} />

              <div className="categories__head__row ">
                <h5>Best Seller</h5>
                <p>{finalDocs.length} Books</p>
              </div>

              <Row>
                {finalDocs.map((data, index) => {
                  if (index > startIndex && index < endIndex ){
                    return (
                      <Col id={index} xs="6" sm="4" md="2">
                        
                          <Product
                            key={index}
                            name={data.data().name}
                            author={data.data().author}
                            image={data.data().thumbnail}
                            price={data.data().price}
                            cutPrice={data.data().cutPrice}
                            id = {data.id}
                          />
                     
                      </Col>
                    );
                  }
                  
                })}
                {/* <div className="pagination__div">
                  <UsePagination />
                </div> */}
                <div className="pagination__div">
                 
                  <button onClick={prevPage}>PREV</button>
                  <button onClick={nextPage}> NEXT</button>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
      <PopularList />

      <Featur />
    </div></>
  );
}

export default BestSeller;
