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
function BookTalk() {
    // const [modalControl, setModalControl] = useState(false)
 const [name, setName] = useState('')
 const [description,setDescription] = useState('')
 const [image, setImage] = useState('')
const [uploading, setUploading] = useState(false) 
const [bookTalks, setBookTalks] = useState([])
const [searchTerm, setSearchTerm] = useState("");
  const [bookNames,setBookNames] = useState([])
  const [search,setSearch] = useState(false)
  const [book,setBook] = useState('')
  const [modal,setModal] = useState(false)

  const [title1,setTitle1] = useState('')
  const [title2,setTitle2] = useState('')
  const [title3,setTitle3] = useState('')
  const [title4,setTitle4] = useState('')
  const [title5,setTitle5] = useState('')
  const [title6,setTitle6] = useState('')
  const [content1,setContent1] = useState('')
  const [content2,setContent2] = useState('')
  const [content3,setContent3] = useState('')
  const [content4,setContent4] = useState('')
  const [content5,setContent5] = useState('')
  const [content6,setContent6] = useState('')
  const [title,setTitle] = useState('')
  const cookies = new Cookies();

  const admin = cookies.get('admin')
const fetchData = async () => {
    const q = await query(collection(db, "bookTalk"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      setBookTalks(snapshot.docs.map((doc) => doc));
      // console.log(snapshot.docs.map((doc) => doc.data))
    });
  };
  const fetchAdmin = async () => {
    const docRef = doc(db, "admin","VCpm3OTuga0YidDTEIe4");
    const docSnap = await getDoc(docRef);

    // setAdmin(docSnap.data());
  };

 const upload = async ()=>{
    setUploading(true)
  
    const docRef = await addDoc(collection(db, "bookTalk"), {
      book:book,
       title1:title1,
       title2:title2,
       title3:title3,
       title4:title4,
       title5:title5,
       title6:title6,  
       content1:content1,
       content2:content2,
       content3:content3,
       content4:content4,
       content5:content5,
       content6:content6,
       author:'author',
       date: new Date(),
       title:title,

       timestamp: serverTimestamp(),
    })
     
    const thumbRef = ref(storage,`bookTalk/${docRef.id}/image`);
    await uploadString(thumbRef, image, "data_url").then(async (snapshot) => {
      const downloadURL = await getDownloadURL(thumbRef);
    
      await updateDoc(doc(db, "bookTalk", docRef.id), {
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

const fetchBookNames = async () => {
    const q = await query(
      collection(db, "products")

      //  orderBy('timestamp', "desc")
    );
    const data = await getDocs(q);
    setBookNames(data.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    fetchData();
    fetchBookNames()
    fetchAdmin()
  }, []);
  
  const deletItem = async (id) => {
    await deleteDoc(doc(db, "bookTalk", id));
    const imageRef = ref(storage, `bookTalk/${id}/image`);
    deleteObject(imageRef)
    
  };

  const searchControl = (e)=>{
    setSearchTerm(e)
 setSearch(true)
  }
 
  const selectName = (e)=>{
    setSearchTerm(e)
    setBook(e)
    setSearch(false)
  }
    return (
    <div>
      {admin == 'true' ? <><NavBar/>
        <div className='ad__cat'>
    <div className='ad__act__head'>
    <h4>Book of the month</h4>
   <button onClick={()=>setModal(true)} >Add</button>
    </div>  
 
    <div className='upload__content'>  
    
    </div>
    

<Table striped bordered hover id='ad__cat__table'>
  <thead>
    <tr>
      <th>#</th>
      <th>Title</th>
      <th>Book</th>
{/* <th>Description</th> */}
      <th>Action</th>
    </tr> 
  </thead>
  <tbody>
      {bookTalks.map((data,index)=>{
          const no = bookTalks.length - index
          return(
<tr key={index}>
      <td>{no}</td>
      <td>{data.data().title}</td>  
      <td> {data.data().book}</td>
      
      <td><button value={data.id}
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
        <input
        placeholder='Title'
        value={title}
        onChange={((e)=>setTitle(e.target.value))}
            id='book__talk__input__2'/>
            
        <div>
            <input
            id='book__talk__input__1'
            placeholder='Select the book by search'
            value={searchTerm}
            onChange={(e)=>searchControl(e.target.value)}
            />
             {bookNames
            .filter((data) => {
              if (searchTerm == "") {
                return data;
              } else if (
                data.name.toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return data;
              }
            })
            .map((data, index) => {
              if (search) {
                return (
                    <div key={index} 
                    onClick= { ()=>selectName(data.name)}
                    className='book__talk__book__show'>
                    {data.name}
                    </div>
                );
              }
            })}
            
        </div>
        <div style={{marginTop:'10px'}}>
       Thumbnail</div>
        <input
        type='file'
            id='book__talk__input__2'
             
            
            onChange={handleImage}
            />

        <div>
            <h5>Features</h5>
            <div className='bookTalk__row'>
                <h6>1</h6>
                <div  className='bookTalk__row__div'>
                <input placeholder='Title'
                value={title1}
                onChange={((e)=>setTitle1(e.target.value))}
                />
                <textarea placeholder='Content'
                value={content1}
                 onChange={((e)=>setContent1(e.target.value))}
                />
                </div>
                
            </div>
        </div>
        <div>
            
            <div className='bookTalk__row'>
                <h6>2</h6>
                <div  className='bookTalk__row__div'>
                <input placeholder='Title'
                value={title2}
                onChange={((e)=>setTitle2(e.target.value))}
                />
                <textarea placeholder='Content'
                value={content2}
                 onChange={((e)=>setContent2(e.target.value))}
                />
                </div>
                
            </div>
        </div>
        <div>
             
            <div className='bookTalk__row'>
                <h6>3</h6>
                <div  className='bookTalk__row__div'>
                <input placeholder='Title'
                value={title3}
                onChange={((e)=>setTitle3(e.target.value))}
                />
                <textarea placeholder='Content'
                value={content3}
                 onChange={((e)=>setContent3(e.target.value))}
                />
                </div>
                
            </div>
        </div>
        <div>
            
            <div className='bookTalk__row'>
                <h6>4</h6>
                <div  className='bookTalk__row__div'>
                <input placeholder='Title'
                value={title4}
                onChange={((e)=>setTitle4(e.target.value))}
                />
                <textarea placeholder='Content'
                value={content4}
                 onChange={((e)=>setContent4(e.target.value))}
                />
                </div>
                
            </div>
        </div>
        <div>
     
            <div className='bookTalk__row'>
                <h6>5</h6>
                <div  className='bookTalk__row__div'>
                <input placeholder='Title'
                value={title5}
                onChange={((e)=>setTitle5(e.target.value))}
                />
                <textarea placeholder='Content'
                value={content5}
                 onChange={((e)=>setContent5(e.target.value))}
                />
                </div>
                
            </div>
        </div>
        <div>
         
            <div className='bookTalk__row'>
                <h6>6</h6>
                <div  className='bookTalk__row__div'>
                <input placeholder='Title'
                value={title6}
                onChange={((e)=>setTitle6(e.target.value))}
                />
                <textarea placeholder='Content'
                value={content6}
                 onChange={((e)=>setContent6(e.target.value))}
                />
                </div>
                
            </div>
           
        </div>
        <button className='bookTalk__button' onClick={upload}>{uploading ? 'Uploading' : 'Upload'}</button>
    </div>
        </Modal>
    </div>
  )
}

export default BookTalk