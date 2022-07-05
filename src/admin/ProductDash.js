import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './productDash.css'
import Sidebar from './Sidebar'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import EditIcon from '@material-ui/icons/Edit';
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
  updateDoc,getDoc,where
} from "@firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
 
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

function ProductDash() {
    const [searchTerm,setSearchTerm] = useState('')
    const [products,setProducts] = useState([])
    const [searchBy,setSearchBy] = useState('')
    const [stock,setStock] = useState([])
    const [sale,setSale] = useState([])
    const [totalSale,setTotalSale] = useState('')
    const [outOfStock,setOutOfStock] = useState('')
    const fetchData = async () => {
        const q = await query(collection(db, "products"),
        orderBy("timestamp","desc")
        );
        onSnapshot(q, (snapshot) => {
          setProducts(snapshot.docs.map((doc) => doc));
          // console.log(snapshot.docs.map((doc) => doc.data))
        });
      };

      const fetchOutOfStock = async () => {
        const q = await query(
         collection(db, "products"),
          where("stock", "<", '1')
        );
            const data =   await getDocs(q)
              setProducts(data.docs.map((doc) => doc));
      };
      const showOutOfStock = async () => {
        const q = await query(
         collection(db, "products"),
          where("stock", "<", '1')
        );
            const data =   await getDocs(q)
              setOutOfStock(data.docs.map((doc) => doc));
      };
      const fetchTotalStock = async () => {
        const q = await query(
         collection(db, "products"),
        );
            const data =   await getDocs(q)
              setStock(data.docs.map((doc) => doc.data()));
      };
      const fetchSales = async () => {
        const q = await query(
         collection(db, "order"),
        );
            const data =   await getDocs(q)
              setSale(data.docs.map((doc) => doc.data()));
      };

      const findTotalSale = async () => {
        // let sum = 0;
        let q = 0;
        sale.forEach((element) => {
        //   let price = parseInt(element.data().quantity * element.data().quantity);
        //   let quantity = parseInt(element.order);
        //   q += quantity;
        //   sum += price;
     
        element.order.forEach((element) => {
               let quantity = parseInt(element.quantity);
          q += quantity;
             
            });
            
        });
        setTotalSale(q);
    console.log(q)
      };
     useEffect(()=>{
        fetchData()
        fetchTotalStock()
        fetchSales()
        showOutOfStock()
        
     },[]) 
     useEffect(()=>{
        findTotalSale()
     },[sale])
  return (
    <>
    <NavBar/>
    <Sidebar/>
    <div className='ad__cat'>
    <div className='ad__act__head'>
    <h4  >Products</h4>
   {/* <button onClick={()=>console.log(products)} >Add</button> */}
    </div> 

    <div className='pr__dash__row'>

         
    <Row>
       <Col>
        <div className='pr__dash__box'>
             <h4>Total items : <span style={{color:'green'}}>{stock.length}</span></h4>
             <h5>Total sale : <span style={{color:'green'}}> {totalSale}</span> Books</h5>
             <h5>Out of stock : <span style={{color:'red'}}>{outOfStock.length}</span> Items</h5>
        </div>
        </Col>
        
        
    </Row>
    </div>

    <div className='pr__dash__books'>
        <div className='pr__dash__books__row'>
       <div className='pr__dash__books__left'>   
        <input type='search' 
          placeholder='Search for...'
          value={searchTerm}
          onChange={((e)=>setSearchTerm(e.target.value))}
          />
          <select
          onChange={((e)=>setSearchBy(e.target.value))}
          >
            <option>Search by</option>
            <option value='name'>Name</option>
            <option value='productId'>Product Id</option>
            <option value='category'>Category</option>
            <option value='author' >Author</option>
          </select>
          </div>
<div>
    <button onClick={fetchOutOfStock}>View out of stock</button>
</div>
</div>
        <Row>
        {products.filter((val)=>{
            if(searchTerm == ''){
                return val 

            }else if (
                searchBy == 'category' ? val.data().category.toLowerCase().includes(searchTerm.toLowerCase()) :
                searchBy == 'name' ? val.data().name.toLowerCase().includes(searchTerm.toLowerCase()) :
               
                searchBy == 'author' ? val.data().author.toLowerCase().includes(searchTerm.toLowerCase())
                 :
                 searchBy == 'productId' ? val.data().productId.toLowerCase().includes(searchTerm.toLowerCase()):
                  val.data().name.toLowerCase().includes(searchTerm.toLowerCase())      
                 
                 ){
                    return val
                 }
        }).map((data, index) =>{
            return(
                <Col key={index} xs="6" sm="4" md="2">
            <div className="book__item"
            id= {data.data().stock < 1 ? 'dash__book__div' : ''}
            >
              
                <img src={data.data().thumbnail} />
               
              
               
              {/* </Link> */}
              <div className="book__item__name">
                  <h6>{data.data().name}</h6>
                  <p>{data.data().productId}</p>
                  <p>Stock : {data.data().stock}</p>
                </div>
                <div className='admin__cat__edit__div flex' >
                   {/* <EditIcon
                   onClick={()=>editModalContro(data.id)}
                   type='button' id='cat__edi__icon'/> */}
                   <Link
                to={`/admin/bookView/${data.id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  justifyContent: "center",
                  width:'100%'
                }}
              >
                <button id='pr__dash__btn'>View</button>
              </Link>   
                </div>
            </div>
            
          </Col>
            )
        })
        }</Row>
    </div>
    </div>
    </>
    
  )
}

export default ProductDash