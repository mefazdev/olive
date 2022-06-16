import { Button } from 'bootstrap'
import React, { useEffect, useState } from 'react'
import '../admin/categories.css'
import Navbar from '../admin/NavBar'
import CancelIcon from '@material-ui/icons/Cancel';
import Modal from "react-bootstrap/Modal";
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
  updateDoc,getDoc
} from "@firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import { Table } from 'react-bootstrap';
import Cookies from 'universal-cookie';

function Categories() {
    const [modalControl, setModalControl] = useState(false)
    const [title, setTitle] = useState('')
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [categories, setCategories] = useState([])
    const cookies = new Cookies();

    const admin = cookies.get('admin')

      const fetchData = async () => {
        const q = await query(collection(db, "categories"), orderBy("timestamp", "desc"));
        onSnapshot(q, (snapshot) => {
          setCategories(snapshot.docs.map((doc) => doc));
          // console.log(snapshot.docs.map((doc) => doc.data))
        });
      };
      const fetchAdmin = async () => {
        const docRef = doc(db, "admin","VCpm3OTuga0YidDTEIe4");
        const docSnap = await getDoc(docRef);
    
        // setAdmin(docSnap.data());
      };
    const handleUpload = async ()=>{
setUploading(true)
const docRef = await addDoc(collection(db, "categories"), {
     title : title, 
    timestamp: serverTimestamp(),     
  });

  const imageRef = ref(storage, `upload/${docRef.id}/image`);
 
    await uploadString(imageRef, image, "data_url").then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "categories", docRef.id), {
        image: downloadURL,
      
      });

      
    });
    setUploading(false)
    setModalControl(false)
}  

    const handleChange = (e)=>{
        const reader = new FileReader();
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
        }
    
        reader.onload = (readerEvent) => {
          setImage(readerEvent.target.result);
         
        };
    }

    const deletItem = async (id) => {
        await deleteDoc(doc(db, "categories", id));
        const imageRef = ref(storage, `upload/${id}/image`);
        deleteObject(imageRef).then(console.log("image deleted"));
      };
    // const deletItem = async (id) => {
    //     await deleteDoc(doc(db, "", id));
    //   };

    useEffect (()=>{
        fetchData()
        fetchAdmin()
    },[])
  return (

    <>
    {admin == 'true'  ? <><Navbar/>
        <div className='ad__cat'>
            <div className='ad__act__head'>
            <h4>Categories</h4>
           <button onClick={()=>setModalControl(true)} >Add</button>
            </div>
    
            <Table striped bordered hover id='ad__cat__table'>
  <thead>
    <tr>
      <th>#</th>
      <th>Title</th>
      <th>Thumbnail</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
      {categories.map((data,index)=>{
          const no = categories.length - index
          return(
<tr key={index}>
      <td>{no}</td>
      <td>{data.data().title}</td>  
      <td><img src={data.data().image} /></td>
      <td><button value={data.id}
        onClick={(e) => deletItem(e.target.value)}>Delete</button></td>
    </tr>
          )
      })}
    
   
   
  </tbody>
</Table>
        </div></> :''}
    
        <Modal
        show={modalControl}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

          <div className='ad__cat__box'>
              <CancelIcon id='close__icon'
              onClick={()=>setModalControl(false)}
              />
              <div style={{marginTop:'20px'}}>
              <label>Title</label>
              <input type='text' value={title}
              onChange={((e)=>setTitle(e.target.value))}
              />
              </div>
              <div style={{marginTop:'20px'}}>
              <label>Thumbnail</label>
              <input  type='file'
              onChange={handleChange}
              />
              </div>
             
             <button onClick={handleUpload}>{uploading ? "Uploading" : "Upload"}</button>
          </div>
          </Modal>
    </>

  )
}

export default Categories