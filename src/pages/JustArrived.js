import "../style/css/categories.css";
import "./../style/css/justArrived.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SearchIcon from "@material-ui/icons/Search";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import book from "../images/book-read.png";
import FilterListIcon from "@material-ui/icons/FilterList";

import Featur from "../components/Featur";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import PopularList from "../components/PopularList";
import UsePagination from "../components/Pagination";

import { Link } from "react-router-dom";

import FilterSearch from "../components/FilterSearch";

import JustArrivedBook from "../components/JustArrivedBook";
import { db } from "../firebase";
import { collection, query, getDocs, where } from "@firebase/firestore";
import Header from "../components/Header";

function JustArrived() {
  const [show, setShow] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [product, setProduct] = useState([]);
  const [startIndex, setStartIndex] = useState(-1);
  const [endIndex, setEndIndex] = useState(49);
  const [searchKey,setSearchkey] = useState('')
  const [searchTerm,setSearchTerm] = useState('')
  
  const styles = { fontSize: "17px", marginRight: "10px" };


  function onChangeValue(e ) {
    setSearchkey(e);
    
  }
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


  const nextPage = () => {
    setStartIndex(startIndex + 49);
    setEndIndex(endIndex + 49);
  };
  const prevPage = () => {
    if (startIndex >= 48) {
      setStartIndex(startIndex - 49);
      setEndIndex(endIndex - 49);
    }
  };  
  return (
    <>
      <Header />
      <div className="categories container">
        <div className="path ">
          <p>Home </p>
          <ArrowForwardIosIcon id="path__icon" />
          <p>Categories </p>
          <ArrowForwardIosIcon id="path__icon" />
          <p>Just Arrived</p>
        </div>

        <div className="categories__content">
          <Row>
            {/* <<<<<<<<<<<<<<< FILTER SEARCH >>>>>>>>>>>>>>>>>>> */}
            {/* <FilterSearch /> */}
           <Col  xs="12" lg="2">
           <div
            // className="book__search__row"
           className= {openFilter ? "search__items__open" : "search__items"}
           >
                  <div className="book__search__input__row">

                  <input id='book__search__input'
                  onChange={((e)=>setSearchTerm(e.target.value))}
                  type='text'
                 placeholder="Search by Key word" 
                  />
                  <div className="book__search__icon__div"><SearchIcon id='book__search__icon'/></div>
                  
                  </div>
                  <div className="book__search__options">
                    By Name
                    <input type='radio'
                    name="searchKey"
                    value='name'
                    onChange={((e)=>onChangeValue(e.target.value))}
                    />
                  </div>
                  <div className="book__search__options">
                     By Author 
                     <input
                      value='author'
                      onChange={((e)=>onChangeValue(e.target.value))}
      
                     type='radio' name="searchKey"/>
                  </div>
                  <div className="book__search__options">
                    By Category <input 
                     value='category'
                     onChange={((e)=>onChangeValue(e.target.value))}
     
                    type='radio' name="searchKey"/>
                  </div>
                  <div className="book__search__options">
                    By Publisher <input
                     value='publisher'
                     onChange={((e)=>onChangeValue(e.target.value))}
     
                    type='radio' name="searchKey"/>
                  </div>
                  <div className="book__search__options">
                    By Language <input 
                     value='language'
                     onChange={((e)=>onChangeValue(e.target.value))}
     
                    type='radio' name="searchKey"/>
                  </div>
                  <div className="book__search__options">
                     By ID <input
                      value='id'
                      onChange={((e)=>onChangeValue(e.target.value))}
      
                     type='radio' name="searchKey"/>
                  </div>
                  
                </div>
                <div className="filter__icon__div">
                  <FilterListIcon
          id="filter__icon"
          onClick={() => setOpenFilter(!openFilter)}
          type="button"
        />
      </div>
           </Col>
            {/* Categries right Column */}
            <Col  md="10">
              <div className="categories__right">
                <img
                  id="categories__right__img"
                  className="col-12"
                  src={book}
                />

                <div className="categories__head__row">
                  <h5>Just Arrived</h5>
                  <p>{product.length}Books</p>
                </div>

               
             
                <Row>

                  {product.filter((val)=>{
                    if(searchTerm === ''){
                      return val
                    }else if (
                      searchKey == 'category' ? val.data().category.toLowerCase().includes(searchTerm.toLowerCase()) :
                      searchKey == 'name' ? val.data().name.toLowerCase().includes(searchTerm.toLowerCase()) :
                     
                      searchKey == 'author' ? val.data().author.toLowerCase().includes(searchTerm.toLowerCase())
                       :
                       searchKey == 'publisher' ? val.data().publisher.toLowerCase().includes(searchTerm.toLowerCase()):
                       searchKey == 'language' ? val.data().language.toLowerCase().includes(searchTerm.toLowerCase()):
                       searchKey == 'id' ? val.data().productId.toLowerCase().includes(searchTerm.toLowerCase()):
                        val.data().name.toLowerCase().includes(searchTerm.toLowerCase())      
                       
                       ){
                        return val
                       } 
                  }).map((data, index) => {
                    if (index > startIndex && index < endIndex && data.data().stock > 0){
                 
                 
                     return (
                     <Col id={index} xs="6" sm="4" md="2">
                        
                         <JustArrivedBook
                           name={data.data().name}
                           author={data.data().author}
                           image={data.data().thumbnail}
                           price={data.data().price}
                           cutPrice={data.data().cutPrice}
                           offer={data.data().offer}
                           offerZone = {false}
                           sale = {data.data().salse}
                           id={data.id}
                         />
                        
                     </Col>
                   );}
                 })
                  
                  }


                 

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
      </div>{" "}
      <Footer />{" "}
    </>
  );
}

export default JustArrived;
