import React, { useEffect, useState } from 'react'
import '../admin/addBook.css'
import Navbar from '../admin/NavBar'
import CancelIcon from '@material-ui/icons/Cancel';
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import {db} from '../firebase'
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
  getDoc,

} from "@firebase/firestore";
import { deleteObject,   ref, } from 'firebase/storage';
import { Table } from 'react-bootstrap';

import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Sidebar from './Sidebar';
function CategoryItems() {
//  const [admin,setAdmin] =useState ({})
const categoryName = useParams().id;
const [category, setCategory] = useState('')
    const [modalControl,setModalControl] = useState(false)
    const [uploading,setUploading] = useState (false)
    const [products, setProducts] = useState([]) 
    const  [fethedCategory, setFethedCategory] = useState([])
    const fethCategory = async ()=>{
        const q = await query(collection(db, "categories"), orderBy("timestamp", "desc"));
        onSnapshot(q, (snapshot) => {
          setFethedCategory(snapshot.docs.map((doc) => doc));
    
        });
       }
 
 
  const cookies = new Cookies();
  const admin = (cookies.get('admin'))



   const fetchData = async () => {
    const q = await query(collection(db, "products"), 
    // orderBy("timestamp", "desc")
    where("category", "==", categoryName)
    );
    
    onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => doc));
      // console.log(snapshot.docs.map((doc) => doc.data))
    });
  
  }

// const fetchData = async () => {
//     const q = await query(
//       collection(db, "products"),
//       where("category", "==", categoryName)
//     );
//     const data = await getDocs(q);
//     setProducts(data.docs.map((doc) => doc));
//   };


  const changeCategory = async (id)=>{
    const docRef = doc(db, 'products', id);
    const updateRef=  await updateDoc (docRef,  {
       category: category
       })
console.log(id)
  }
 

  
  

 

 

 

useEffect(()=>{
 
fetchData()
fethCategory()
},[])
    return (
     
      <>  
      { admin == 'true' ? <> <Navbar/>  
      <Sidebar/>
       <div className='ad__cat'>
    <div className='ad__act__head'>
    <h4  >{categoryName} </h4>
    <h5> {products.length} <span  >Books</span></h5>
   {/* <button 
 
   >Add</button> */}
    </div>  
 
    <div className='upload__content'>
        <div className='upload__content__head'>
        <p>
          
        </p>
       
        </div>

         <Table striped bordered hover id='ad__cat__table'>
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Author</th>
      {/* <th>Price</th> */}
      {/* <th>Category</th> */}
      <th></th>
      <th>Change Category</th>
      {/* <th>Action</th> */}
    </tr>
  </thead>
  <tbody>
      {products.map((data,index)=>{
          const no = products.length - index
          return(
<tr key={index}>
      <td>{no}</td>
      <td>{data.data().name}</td>  
      <td>{data.data().author} </td>
      {/* <td>{data.data().price}</td> */}
      {/* <td>{data.data().category}</td> */}
      <td><img src={data.data().thumbnail}/></td>
      <td>
        <div className='flex'>
        <select id='cat__edit__select'
        onChange={((e)=>setCategory(e.target.value))}
        >
            
            
               
                 <option>
                  Category
                 </option>
                 {fethedCategory.map((data,index)=>{
                   const option = data.data().title
                   return(
                    <option  key={index}>
                   {option}
                   </option>
                   )
                 })}

        </select>
         <button id='ad__cat__change__btn' 
        
        onClick={()=>changeCategory(data.id)}
       >Change</button>
        </div>
        
       </td>
      {/* <td><button value={data.id} id='ad__cat__table__button'
        onClick={(e) => deletItem(e.target.value)}
        >Delete</button>
       
        </td> */}
    </tr>
          )
      })}
    
   
   
  </tbody>
</Table> 
    </div> 
    </div></> : ""} 
     

    {/* <Modal
        show={true}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      > */}
      {modalControl ? 
      <div className='ad__book__box__modal'>
          <div className='ad__book__box'>
              <CancelIcon id='close__icon'
              onClick={()=>setModalControl(false)}
              />
             
           <div className='edit__category'>

           </div>
           
         
          </div></div> : ''}

          
      </>
   
  )
}

export default CategoryItems