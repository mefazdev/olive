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
 
  doc,
  serverTimestamp,
  deleteDoc,
  getDocs,updateDoc,getDoc
} from "@firebase/firestore";
import Modal from "react-bootstrap/Modal";
import './bookTalk.css'
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import { Table } from 'react-bootstrap';

import CancelIcon from '@material-ui/icons/Cancel';
import { FlashOnTwoTone } from '@material-ui/icons';
import Cookies from 'universal-cookie';
import Sidebar from './Sidebar';
function Banners() {
    // const [modalControl, setModalControl] = useState(false)
    const cookies = new Cookies();

    const admin = cookies.get('admin')
 const [image, setImage] = useState('')
const [uploading, setUploading] = useState(false) 

 
  
  const [modal,setModal] = useState(false)
  const [banners,setBanners]  = useState([])
const [position,setPosition ] = useState('')
const fetchData = async () => {
    const q = await query(collection(db, "banners"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setBanners(snapshot.docs.map((doc) => doc));
      // console.log(snapshot.docs.map((doc) => doc.data))
    });
  };
  

 const upload = async ()=>{
    setUploading(true)
  
    const docRef = await addDoc(collection(db, "banners"), {
    
       position:position,
       timestamp: serverTimestamp(),
    })
     
    const thumbRef = ref(storage,`banners/${docRef.id}/image`);
    await uploadString(thumbRef, image, "data_url").then(async (snapshot) => {
      const downloadURL = await getDownloadURL(thumbRef);
    
      await updateDoc(doc(db, "banners", docRef.id), {
      image: downloadURL,
      });
   }); 
   setUploading(false)
   setModal(false)   
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
 
  useEffect(() => {
    fetchData();
    
  }, []);
  
  const deletItem = async (id) => {
    await deleteDoc(doc(db, "banners", id));
    const imageRef = ref(storage, `banners/${id}/image`);
    deleteObject(imageRef)
    
  };

 
   
    return (
    <div>
      {admin == 'true' ? <><NavBar/>
      <Sidebar/>
        <div className='ad__cat'>
    <div className='ad__act__head'>
    <h4>Banners</h4>
   <button onClick={()=>setModal(true)} >Add</button>
    </div>  
 
    <div className='upload__content'>  
    
    </div>
    

<Table striped bordered hover id='ad__cat__table'>
  <thead>
    <tr>
      <th>#</th>
      <th>Banner</th>
      <th>Position</th>
{/* <th>Description</th> */}
      <th>Action</th>
    </tr> 
  </thead>
  <tbody>
      {banners.map((data,index)=>{
          const no = banners.length - index
          return(
<tr key={index}>
      <td>{no}</td>
      <td>
        <img alt = '' src={data.data().image}/>
        </td>  
      <td> {data.data().position}</td>
      
      <td><button value={data.id} id='ad__cat__table__button'
        onClick={(e) => deletItem(e.target.value)}>Delete</button></td>
    </tr>
          )
      })}
    
   
   
  </tbody>
</Table>
    </div></> : ''}
        

    <Modal show={modal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
    <div className='bookTalk__modal'>
        <CancelIcon onClick={()=>setModal(false)} id='bookTalk__Cancel'/>
        <select id='book__talk__input__2'
        onChange={((e)=>setPosition(e.target.value))}
        >
            <option>Select position of banner</option>
            <option>Top main banner</option>
            <option>Top small banner</option>
            <option>Best seller row 1</option>
            <option>Best seller row 2</option>
        </select>
     {/* id='book__talk__input__2' */}
        <div style={{marginTop:'10px'}}>
       Thumbnail</div>
        <input
        type='file'
            id='book__talk__input__2'
             
            
            onChange={handleImage}
            />
        <div>
         
       
           
        </div>
        <button className='bookTalk__button' onClick={upload}>{uploading ? 'Uploading' : 'Upload'}</button>
    </div>
        </Modal>
    </div>
  )
}

export default Banners