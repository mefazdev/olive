import { Button } from 'bootstrap'
import React, { useEffect, useState } from 'react'
import '../admin/categories.css'
import Navbar from '../admin/NavBar'
import CancelIcon from '@material-ui/icons/Cancel';
import Modal from "react-bootstrap/Modal";
// import {db} from '../firebase'
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
  updateDoc,getDoc
} from "@firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import { Col, Row, Table } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

import Sidebar from './Sidebar';

function Categories() {
    const [modalControl, setModalControl] = useState(false)
    const [editModal,setEditModal] = useState(false)
    const [title, setTitle] = useState('')
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [categories, setCategories] = useState([])
    const [modalId,setModalId]=useState('')
    const [searchTerm,setSearchTerm] = useState('')
    const cookies = new Cookies();

    const admin = cookies.get('admin')

      const fetchData = async () => {
        const q = await query(collection(db, "categories"),
        orderBy("title")
        );
        onSnapshot(q, (snapshot) => {
          setCategories(snapshot.docs.map((doc) => doc));
          // console.log(snapshot.docs.map((doc) => doc.data))
        });
      };
      // const fetchAdmin = async () => {
      //   const docRef = doc(db, "admin","VCpm3OTuga0YidDTEIe4");
      //   const docSnap = await getDoc(docRef);
    
      //   setAdmin(docSnap.data());
      // };
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

    
    
    const handleImage = async (e ) => {
      const reader = new FileReader();
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
  
      reader.onload = async (readerEvent) => {
        setImage(readerEvent.target.result);
      
      };
      
      
    };

      const handleUpdate = async ()=>{
        setUploading(true)
        const thumbRef = ref(storage, `upload/${modalId}/image`);
        await uploadString(thumbRef, image, "data_url").then(
          async (snapshot) => {
            const downloadURL1 = await getDownloadURL(thumbRef);
            await updateDoc(doc(db, "categories", modalId), {
             image:downloadURL1,
            });
          }
        );
        setUploading(false)
        setEditModal(false)
      }
      const editModalContro = async(id)=>{
        setEditModal(true)
        setModalId(id)
        console.log(id)

      }
    useEffect (()=>{
        fetchData()
        // fetchAdmin()
    },[])
  return ( 

    <>
    {admin == 'true'  ? <><Navbar/>
    <Sidebar/>
        <div className='ad__cat'>
            <div className='ad__act__head'>
            <h4>Categories</h4>
           <button onClick={()=>setModalControl(true)} >Add</button>
            </div>
            <div className='ad__cat__search'> <input id='ad__author__search__input'
      placeholder='Search author'
      value={searchTerm}
      onChange={((e)=>setSearchTerm(e.target.value))}
      /></div>
    <Row>
      {categories.filter((val)=>{
        if(searchTerm == ''){
          return val
        }else if(val.data().title.toLowerCase().includes(searchTerm.toLowerCase())){
          return val
        }
      }).map((data,index)=>{
        return (
          <Col key={index} xs="6" sm="4" md="2">
            <div className="book__item">
              
                <img src={data.data().image} />
               
              
               
              {/* </Link> */}
              <div className="book__item__name">
                  <h6>{data.data().title}</h6>
                </div>
                <div className='admin__cat__edit__div flex' >
                   <EditIcon
                   onClick={()=>editModalContro(data.id)}
                   type='button' id='cat__edi__icon'/>
                   <Link
                to={`/admin/categoryItems/${data.data().title}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  justifyContent: "center",
                }}
              ><ArrowForwardIcon type='button' id='cat__forword__icon'/></Link>
                </div>
            </div>
            
          </Col>
        );
      })}
   
    </Row>
        
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
          <Modal
        show={editModal}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

          <div className='ad__cat__box'>
              <CancelIcon id='close__icon'
              onClick={()=>setEditModal(false)}
              />
              
              <img src={image} /> <br />
                <div className="file-input">
                  <input type="file" id="img2" onChange={handleImage} />
                  <label htmlFor="img2">Change Image </label>
                </div>
             
             <button onClick={handleUpdate}>{uploading ? "Updating" : "Update"}</button>
          </div>
          </Modal>
              
    </>

  )
}

export default Categories



// <Table striped bordered hover id='ad__cat__table'>
// <thead>
//   <tr>
//     <th>#</th>
//     <th>Title</th>
//     <th>Thumbnail</th>
//     <th>Action</th>
//   </tr>
// </thead>
// <tbody>
//     {categories.map((data,index)=>{
//         const no = categories.length - index
//         return(
// <tr key={index}>
//     <td>{no}</td>
//     <td>{data.data().title}</td>  
//     <td><img src={data.data().image} /></td>
//     <td><button value={data.id}
//       onClick={(e) => deletItem(e.target.value)}>Delete</button></td>
//   </tr>
//         )
//     })}
  
 
 
// </tbody>
// </Table>