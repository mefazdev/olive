import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './bookOfMonth.css'
import './orders.css'
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
  where
} from "@firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import { Table } from 'react-bootstrap';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

import CancelIcon from '@material-ui/icons/Cancel';
function Orders() {
    const [user, setUser] = useState({});
    const [modalControl, setModalControl] = useState(false)
 const [name, setName] = useState('')
 const [description,setDescription] = useState('')
 const [image, setImage] = useState('')
const [uploading, setUploading] = useState(false) 
const [bookMonths, setBookMonths] = useState([])
const [orders,setOrders] = useState([])
const [address,setAddress] = useState([])
// const userId =  orders[0].data().userId

// onAuthStateChanged(auth, (currentUser) => {
//     setUser(currentUser);
//   });
const ADDRESS = address.length != 0 ? address[0]:''
const fetchData = async () => {
    const q = await query(collection(db, "order"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map((doc) => doc));
      // console.log(snapshot.docs.map((doc) => doc.data))
    });
  };

  const fetchAddress = async () => {
    // const userId =  orders[0].data().userId
    if (orders.length != 0) {
      const q = await query(
        collection(db, "address"),
        where("userID", "==", orders[0].data().userId)
      );
      onSnapshot(q, (snapshot) => {
        setAddress(snapshot.docs.map((doc) => doc.data()));
      });
    }
  };
 const handleUpload = async ()=>{
    setUploading(true)
  
    const docRef = await addDoc(collection(db, "bookMonth"), {
       name:name,
       description:description,
       timestamp: serverTimestamp(),
    }) 
    const thumbRef = ref(storage, `bookMonth/${docRef.id}/image`);
    await uploadString(thumbRef, image, "data_url").then(async (snapshot) => {
      const downloadURL = await getDownloadURL(thumbRef);
    await updateDoc(doc(db, "bookMonth", docRef.id), {
      image: downloadURL,
      });
   });   
   setUploading(false)
   setModalControl(false)   
}

  
  
  useEffect(()=>{
      fetchData()
  },[])

  useEffect(()=>{
    fetchAddress()
},[orders])
    return (
    <div>
        <NavBar/>
        <div className='order__cat'>
    <div className='ad__act__head'>
    <h4>Book of the month</h4>
   <button onClick={()=>console.log(address)} >Add</button>
    </div>  
 
    <div className='upload__content'>  
    
    </div>
    {modalControl ? <div className='ad__book__box__modal'>
          <div className='book__month__modal'>
              <CancelIcon id='book__month__close'
              onClick={()=>setModalControl(false)}
              />

            

             <button className='bookMonth__button'  
            // onClick={()=>console.log('cat',category)}
             >{uploading ? "Uploading" : "Upload"}</button>
              </div>
              </div>
    :''}

<Table striped bordered hover id='ad__cat__table'>
  <thead>
    <tr>
      <th>#</th>
      <th>Products</th>
      <th>Image</th>
<th>Address</th>
<th>Total</th>
      <th>Payment</th>
      <th>Status</th>
      <th>Action</th>
    </tr> 
  </thead>
  <tbody>
      {orders.map((data,index)=>{
          const no = orders.length - index
        //   setUser(data.data().userId)
          return(
<tr key={index}>
      <td>{no}</td>
      {data.data().order.map((order)=>{
         return(
             <td>{order.name} ({order.quantity}) <br/>
            by {order.author}
              </td>
             
         )
      })}
      {/* <td>{data.data().name}</td>   */}
      {data.data().order.map((order)=>{
         return(
             <td> 
             <img src={order.thumbnail} />
              </td>
             
         )
      })}
      <td>
          {ADDRESS.name} <br/>
          {ADDRESS.streetAddress}<br/>
          {ADDRESS.town}<br/>
          {ADDRESS.district}<br/>
          {ADDRESS.state}<br/>
          {ADDRESS.pin}<br/>
      </td>
      <td>{data.data().total}</td>
      <td>{data.data().paymentType}</td>
      <td>
          
          {data.data().status}
        </td>
        <td><button>Deliver</button></td>
    </tr>
          )
      })}
    
   
   
  </tbody>
</Table>
    </div>
    </div>
  )
}

export default Orders