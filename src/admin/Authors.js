import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './bookOfMonth.css'
import { db, storage } from "../firebase";
import './authors.css'
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
  where,getDoc
} from "@firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import { Table } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import CancelIcon from '@material-ui/icons/Cancel';
import Cookies from 'universal-cookie';

function Authors() {
  // const [cookies, setCookie] = useCookies(['admin']);
    const [modalControl, setModalControl] = useState(false)
 const [name, setName] = useState('')
 const [description,setDescription] = useState('')
 const [image, setImage] = useState('')
const [uploading, setUploading] = useState(false) 
const [authors, setAuthors] = useState([])

const [born,setBorn] = useState('')
const [genre,setGenre] = useState('')
const [language,setLanguage] = useState('')
const [nationality,setNationality] = useState('')
const [work,setWork] = useState('')
const [firstBook,setFirstBook] = useState('')
const [latestWork,setLatestWork] = useState('')
const cookies = new Cookies();

const admin = cookies.get('admin')
const fetchData = async () => {
    const q = await query(collection(db, "authors"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setAuthors(snapshot.docs.map((doc) => doc));
    
    });
  };

  const fetchAdmin = async () => {
    const docRef = doc(db, "admin","VCpm3OTuga0YidDTEIe4");
    const docSnap = await getDoc(docRef);

    // setAdmin(docSnap.data());
  };
 const handleUpload = async ()=>{
    setUploading(true)
  
    const docRef = await addDoc(collection(db, "authors"), {
       name:name,
       description:description,
       born:born,
       genre:genre,
       nationality:nationality,
       language:language,
       work:work,
       firstBook:firstBook,
       latestWork:latestWork,
       image:image,
       timestamp: serverTimestamp(),
    }) 
    const thumbRef = ref(storage,`authors/${docRef.id}/image`);
    await uploadString(thumbRef, image, "data_url").then(async (snapshot) => {
      const downloadURL = await getDownloadURL(thumbRef);
    
      await updateDoc(doc(db, "authors", docRef.id), {
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
    await deleteDoc(doc(db, "authors", id));
    const imageRef = ref(storage, `authors/${id}/image`);
    deleteObject(imageRef)
  };
  useEffect(()=>{
      fetchData() 
      fetchAdmin()
  },[])

  // if( cookies.Admin  == 'false'){
    return (
      <div>
        {admin == "true" ?
        
        <><NavBar/>
          <div className='ad__cat'>
      <div className='ad__act__head'>
      <h4>Author of the month</h4>
     <button onClick={()=>setModalControl(true)} >Add</button>
      </div>  
   
      <div className='upload__content'>  
      
      </div>
      
      {modalControl ? <div className='ad__book__box__modal'>
            <div className='ad__book__box'>
                <CancelIcon id='book__month__close'
                onClick={()=>setModalControl(false)}
                />
  
                      
              <Row>
                <Col>  <div className='add__book__modal__row__item'>
              
                 <input
                 value={name}
                 onChange={((e)=>setName(e.target.value))}
                 placeholder='Name'
                 type='text'/>
  
               </div></Col>
                <Col><div className='add__book__modal__row__item'>
               
                 <input
                 value={born}
                 onChange={((e)=>setBorn(e.target.value))}
                  placeholder='Born'/>
  
               </div></Col>
              </Row>
              <Row>
                <Col  >  <div className='add__book__modal__row__item'>
               
                 <input
                 placeholder='Genre'
                 
                 onChange={((e)=>setGenre(e.target.value))} value={genre}
                 />
  
               </div></Col>
                <Col  ><div className='add__book__modal__row__item'>
               
                 <input
                 placeholder='Language'
                 value={language} onChange={((e)=>setLanguage(e.target.value))}
                  />
  
               </div></Col>
              </Row>
              <Row>
                <Col>  <div className='add__book__modal__row__item'>
              
                 <input 
                 placeholder='Nationality'
                 value={nationality} onChange={((e)=>setNationality(e.target.value))} 
                 />
  
               </div></Col>
                <Col><div className='add__book__modal__row__item'>
                
                 <input 
                 placeholder='Notable Work'
                 value={work} onChange={((e)=>setWork(e.target.value))}
                  />
  
               </div></Col>
              </Row>
              <Row>
                <Col>  <div className='add__book__modal__row__item'>
              
                 <input 
                 placeholder='First Book'
                 value={firstBook} onChange={((e)=>setFirstBook(e.target.value))} 
                 />
  
               </div></Col>
                <Col><div className='add__book__modal__row__item'>
                
                 <input 
                 placeholder='Latest Work'
                 value={latestWork} onChange={((e)=>setLatestWork(e.target.value))}
                  />
  
               </div></Col>
              </Row>
             
              <Row>
                <Col>  <div className='add__book__modal__row__item'>
                <label style={{marginLeft:'10px'}}>Photo</label>
                 <input
               
                 type='file'
                 
                 onChange={handleImage}
                 />
  
               </div></Col>
               
              </Row>
              <div className='ad__book__desc'>
                <textarea
                onChange={((e)=>setDescription(e.target.value))}
                placeholder='Description'
                rows='5' />
              </div>
               <button className='bookMonth__button'  
               onClick={handleUpload}
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
  <th>Nationality</th>
  <th>Language</th>
  <th>Genre</th>
        <th>Action</th>
      </tr> 
    </thead>
    <tbody>
        {authors.map((data,index)=>{
            const no = authors.length - index
            return(
  <tr key={index}>
        <td>{no}</td>
        <td>{data.data().name}</td>  
        <td><img src={data.data().image} /></td>
        <td>{data.data().nationality}</td>
        <td>{data.data().language}</td>
        <td>{data.data().genre}</td>
        <td><button value={data.id}
          onClick={(e) => deletItem(e.target.value)}>Delete</button></td>
      </tr>
            )
        })}
      
     
     
    </tbody>
  </Table>
      </div></> 
      :''}
          
      </div>
    )
  // }
   
}

export default Authors