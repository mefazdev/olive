import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './bookOfMonth.css'
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

import CancelIcon from '@material-ui/icons/Cancel';
function AuthorOfMonth() {
    const [modalControl, setModalControl] = useState(false)
 const [name, setName] = useState('')
 const [description,setDescription] = useState('')
 const [image, setImage] = useState('')
const [uploading, setUploading] = useState(false) 
const [authorMonths, setAuthorMonths] = useState([])

const fetchData = async () => {
    const q = await query(collection(db, "authorMonth"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setAuthorMonths(snapshot.docs.map((doc) => doc));
      // console.log(snapshot.docs.map((doc) => doc.data))
    });
  };
 const handleUpload = async ()=>{
    setUploading(true)
  
    const docRef = await addDoc(collection(db, "authorMonth"), {
       name:name,
       description:description,
       timestamp: serverTimestamp(),
    }) 
    const thumbRef = ref(storage,`authorOfMonth/${docRef.id}/image`);
    await uploadString(thumbRef, image, "data_url").then(async (snapshot) => {
      const downloadURL = await getDownloadURL(thumbRef);
    
      await updateDoc(doc(db, "authorMonth", docRef.id), {
      image: downloadURL,
      });
   });   
   setUploading(false)
   setModalControl(false)   
}
 const handleImage = (e)=>{
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  
    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
     
    };
  }
  
  const deletItem = async (id) => {
    await deleteDoc(doc(db, "authorMonth", id));
    const imageRef = ref(storage, `authorOfMonth/${id}/image`);
    deleteObject(imageRef)
  };
  useEffect(()=>{
      fetchData() 
  })
    return (
    <div>
        <NavBar/>
        <div className='ad__cat'>
    <div className='ad__act__head'>
    <h4>Author of the month</h4>
   <button onClick={()=>setModalControl(true)} >Add</button>
    </div>  
 
    <div className='upload__content'>  
    
    </div>
    {modalControl ? <div className='ad__book__box__modal'>
          <div className='book__month__modal'>
              <CancelIcon id='book__month__close'
              onClick={()=>setModalControl(false)}
              />

             <Row id='book__month__row'>

                 <Col md={4}>
                 Name
                 </Col>
                 <Col >
                 <input onChange={((e)=>setName(e.target.value))} />
                 </Col>
             </Row>
             <Row id='book__month__row'>
                 <Col md={4}>
              Description
                 </Col>
                 <Col >
                 <textarea
                 onChange={((e)=>setDescription(e.target.value))}
                rows={4}
                />
                 </Col>
             </Row>
             <Row id='book__month__row'>
                 <Col md={4}>
                 Image 
                 </Col>
                 <Col >
               <input
               onChange={handleImage}
               type='file' />
                 </Col>
             </Row>

             <button className='bookMonth__button'  onClick={handleUpload}
            // onClick={()=>console.log('cat',category)}
             >{uploading ? "Uploading" : "Upload"}</button>
              </div>
              </div>
    :''}

<Table striped bordered hover id='ad__cat__table'>
  <thead>
    <tr>
      <th>#</th>
      <th>Title</th>
      <th>Image</th>
<th>Description</th>
      <th>Action</th>
    </tr> 
  </thead>
  <tbody>
      {authorMonths.map((data,index)=>{
          const no = authorMonths.length - index
          return(
<tr key={index}>
      <td>{no}</td>
      <td>{data.data().name}</td>  
      <td><img src={data.data().image} /></td>
      <td>{data.data().description}</td>
      <td><button value={data.id}
        onClick={(e) => deletItem(e.target.value)}>Delete</button></td>
    </tr>
          )
      })}
    
   
   
  </tbody>
</Table>
    </div>
    </div>
  )
}

export default AuthorOfMonth